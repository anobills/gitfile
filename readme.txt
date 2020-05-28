The first git file

git init
// 创建版本库

git add textName
git commit -m "deciration"

// 添加文件到版本库

git status
// 查看文件状态(是否改变)

git diff
// 查看与上次修改的不同

git log (--pretty=oneline)
// 看提交的各个版本（含提交时间和描述）

git reset --hard head^
// 回退至上一版本

git reset --hard commitId
// 回退到对应commitId版本

git reflog
// 查看历史版本回退记录