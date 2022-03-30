import { reactive } from 'vue'

const organizations = reactive([])
const projects = reactive([])

function setOrganizations (newList) {
  organizations.splice(0, organizations.length, ...newList)
}

function setProjects (newList) {
  projects.splice(0, projects.length, ...newList)
}

function addProject (project) {
  projects.push(project)
}

function updateProject (project) {
  const projectIndex = projects.findIndex(c => c.id === project.id)

  if (projectIndex !== -1) {
    Object.assign(projects[projectIndex], project)
  }
}

function getProject (projectId) {
  return projects.find(p => p.id === projectId)
}

function addProjectConsumer (consumer) {
  const project = getProject(consumer.project_id)

  if (project) project.consumers.push(consumer)
}

function removeProjectConsumer (consumer) {
  const project = getProject(consumer.project_id)

  if (project) {
    const consumers = project.consumers

    project.consumers = consumers.filter(c => c.id !== consumer.id)
  }
}

function updateProjectConsumer (consumer) {
  const project = getProject(consumer.project_id)

  if (project?.consumers) {
    const consumers = project.consumers
    const consumerIndex = consumers.findIndex(c => c.id === consumer.id)

    if (consumerIndex !== -1) {
      consumers[consumerIndex] = consumer

      project.consumers = [...consumers]
    }
  }
}

function addProjectRecipient (recipient) {
  const project = getProject(recipient.project_id)

  if (project) project.recipients.push(recipient)
}

function updateProjectRecipient (recipient) {
  const project = getProject(recipient.project_id)

  if (project?.recipients) {
    const recipients = project.recipients
    const recipientIndex = recipients.findIndex(c => c.id === recipient.id)

    if (recipientIndex !== -1) {
      recipients[recipientIndex] = recipient

      project.recipients = [...recipients]
    }
  }
}

function removeProjectRecipient (recipient) {
  const project = getProject(recipient.project_id)

  if (project) {
    const recipients = project.recipients

    project.recipients = [...recipients.filter(r => r.id !== recipient.id)]
  }
}

export {
  organizations,
  projects,
  setOrganizations,
  setProjects,
  addProject,
  updateProject,
  getProject,
  addProjectConsumer,
  removeProjectConsumer,
  updateProjectConsumer,
  addProjectRecipient,
  updateProjectRecipient,
  removeProjectRecipient
}
