import { fail, warn, message, markdown, danger } from "danger"

fail("This is a failure message")
warn("This is a warning")
message("This is a normal message")
markdown("*Markdown* is also **supported**")

const { additions = 0, deletions = 0 } = danger.github.pr
message(`:tada: The PR added ${additions} and removed ${deletions} lines.`)

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

// Warns if there are changes to package.json
const packageChanged = danger.git.modified_files.includes('package.json');

if (packageChanged) {
  warn('Changes were made to package.json');
}

if (danger.github.pr.assignee === null) {
  warn('Assign atleast 2 reviewers to review this PR');
}