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
git reset --hard head~n
// 回退n次

git reset --hard commitId
// 回退到对应commitId版本

git reflog
// 查看历史版本回退记录


// 撤销操作

git checkout -- textName
// 将工作区文件（即使已删除）修改成暂存区（优先）或最新版本库版本，"--"很重要

git reset head textName
// 可以把暂存区的修改撤销掉（unstage），重新放回工作区

git reset --hard head^
// 回退至上一版本

// 删除

git rm textName
// 将文件从版本库删除，到这一步如果后悔的话得先做完以下步骤，在试用版本回退到删除前的版本号
git commit -m "deciration"
// 更新版本库

// 恢复
git checkout -- textName
// 将对应文件恢复到工作区