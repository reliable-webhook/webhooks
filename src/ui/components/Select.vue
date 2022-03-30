<template>
  <Listbox
    v-model="selectedOptionValue"
  >
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full border border-gray-300 py-2 px-4 pr-10 text-left bg-white cursor-default text-base"
      >
        <span class="block truncate">{{ options.find(o => o.value === selectedOptionValue)?.name }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute w-full mt-1 overflow-auto text-base bg-white border border-gray-300 max-h-60 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            v-slot="{ active, selected }"
            :key="option.name"
            :value="option.value"
            as="template"
          >
            <li
              :class="[
                active ? 'text-gray-900 bg-gray-100' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >{{ option.name }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-grey-600 "
              >
                <CheckIcon
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { SelectorIcon, CheckIcon } from 'icons'

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedOptionValue: this.options[0]?.value
    }
  }
}
</script>
