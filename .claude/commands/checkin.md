Check in and push all changes to the remote repository.

## Instructions

1. First, read CLAUDE.md and any other memory files for project-specific git instructions
2. Run `git status` to see all uncommitted changes (staged, unstaged, untracked)
3. If there are multiple unrelated changes, inform the user and ask if they want:
   - A single combined commit
   - Separate commits for each logical change
4. Run `git diff` to understand what changed
5. Stage all relevant changes
6. Draft a **short** commit message (in brief words) with relevant keywords
7. Present a summary to the user showing:
   - Files to be committed
   - Proposed commit message
   - Ask for confirmation before proceeding
8. Only after user confirms: commit and push to remote
9. Report the result to the user

## Commit Message Style

- Keep it short
- Use keywords that capture the change: Add, Update, Fix, Remove, Refactor
- Include key nouns: what file/feature/component was changed
- Example: "Add checkin command; update gitignore"
- Example: "Fix piano frequency calculation"

## Important

- Follow any git workflow instructions found in memory files
- Never commit files containing secrets (.env, credentials, etc.)
- Always wait for user confirmation before committing
