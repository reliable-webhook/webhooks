<template>
  <pre
    class="whitespace-pre-wrap break-all text-gray-600 dark:text-dark-50"
    v-html="highlightedCode"
  />
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

export default {
  name: 'ResponseHighlight',
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    highlightedCode () {
      const prismLanguage = Prism.languages[this.getCodeLanguage(this.code)]
      const highlightedCodeLines = Prism.highlight(this.code, prismLanguage).split('\n')
      const codeLineNumberMaxLength = highlightedCodeLines.length.toString().length

      const highlightedCodeLinesWithNumbers = highlightedCodeLines
        .map((line, num) => {
          const currentLineNumber = num + 1
          const numberLine = currentLineNumber.toString().padEnd(codeLineNumberMaxLength, ' ')

          return `<span class="code-row-number text-xs text-gray-400">${numberLine}</span> ${line}`
        })

      if (prismLanguage) {
        return highlightedCodeLinesWithNumbers.join('\n')
      } else {
        return this.code
      }
    }
  },
  methods: {
    getCodeLanguage (code) {
      if (this.isJson(code)) {
        return 'json'
      } else if (this.isXml(code)) {
        return 'xml'
      } else {
        return null
      }
    },
    isJson (string) {
      try {
        JSON.parse(string)
      } catch (e) {
        return false
      }

      return true
    },
    isXml (string) {
      try {
        new DOMParser().parseFromString(string, 'text/xml')
      } catch (e) {
        return false
      }

      return true
    }
  }
}
</script>

<style>
pre {
  font-size: 0.75em;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #7D8B99;
}

.token.punctuation {
  color: #5F6364;
}

.token.number {
  color: #FC526A;
}

.token.string {
  color: #228403;
}

.token.boolean {
  color: #0570DE;
}

.token.property,
.token.tag,

.token.function-name,
.token.constant,
.token.symbol,
.token.deleted {
  color: #4B5563 ;
}

.token.selector,
.token.attr-name,

.token.char,
.token.function,
.token.builtin,
.token.inserted {
  color: #635BFF;
}

.token.operator,
.token.entity,
.token.url,
.token.variable {
  color: #a67f59;
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.class-name {
  color: #C84801;
}

.token.regex,
.token.important {
  color: #e90;
}

.language-css .token.string,
.style .token.string {
  color: #a67f59;
}

.token.important {
  font-weight: normal;
}

.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.namespace {
  opacity: .7;
}

.dark {
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(30, 20%, 50%);
  }

  .token.punctuation {
    @apply text-gray-400;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: hsl(350, 40%, 70%);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: hsl(75, 70%, 60%);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: hsl(40, 90%, 60%);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: hsl(350, 40%, 70%);
  }

  .token.regex,
  .token.important {
    color: #e90;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.deleted {
    color: red;
  }
}
</style>
