# Publishing this template (instructor, once)

On your Mac, inside this folder:
```bash
git init -b main
git add .
git commit -m "IT304 template"
gh auth switch -u mit-adrian
gh repo create mit-adrian/it304-template --private --source=. --push
gh repo edit mit-adrian/it304-template --template
git checkout -b dev && git push -u origin dev
```
`--template` makes it a GitHub template repo, so student repos are created from it in one step.
(Delete this file from the repo afterwards if you don't want students to see it.)
