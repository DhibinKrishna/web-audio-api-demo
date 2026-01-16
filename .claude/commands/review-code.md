Review code for quality, bugs, and improvements.

## Arguments

$ARGUMENTS - Optional: specific file path to review. If empty, reviews all modified files.

## Instructions

1. Determine what to review:
   - If `$ARGUMENTS` contains a file path, review that specific file
   - If `$ARGUMENTS` is empty, run `git diff --name-only` to get modified files (staged + unstaged)
   - Also check `git diff --cached --name-only` for staged-only changes

2. For each file to review, read the file content and analyze for:

### Code Quality
- Readability and clarity
- Naming conventions (variables, functions, classes)
- Code duplication
- Function/method length
- Single responsibility principle

### Potential Bugs
- Null/undefined handling
- Edge cases not covered
- Resource leaks (unclosed connections, memory)
- Race conditions
- Off-by-one errors

### Security
- Input validation
- Injection vulnerabilities (SQL, XSS, command)
- Hardcoded secrets or credentials
- Insecure dependencies

### Performance
- Unnecessary loops or computations
- N+1 query patterns
- Missing caching opportunities
- Large memory allocations

### Best Practices
- Error handling
- Logging adequacy
- Test coverage considerations
- Documentation/comments where needed

3. Present findings organized by file, with:
   - **Issue**: What the problem is
   - **Location**: File and line number
   - **Severity**: Critical / Warning / Suggestion
   - **Recommendation**: How to fix it

4. End with a summary:
   - Total issues found by severity
   - Overall code health assessment
   - Top priorities to address

## Output Format

Keep feedback actionable and specific. Reference line numbers when possible.
Praise good patterns you notice, not just problems.
