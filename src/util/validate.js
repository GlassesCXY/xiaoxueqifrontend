import { ElMessage } from "element-plus";

const validateRegister = ({
  username,
  password,
  email,
  name,
}) => {
  //用户名不能为空，用户名为空报错
  if (username == "") {
    ElMessage.error("请输入用户名");
    return false;
  }

  //用户id只能是数字和字母还有下划线，当用户id出现其他内容时，报错
  var useridPattern = /^[a-zA-Z0-9_]+$/;
  if (!useridPattern.test(username)) {
    ElMessage.error("用户名只能是数字、字母以及下划线");
    return false;
  }
  // 检查姓名是否为空，姓名为空报错
  if (name == "") {
    ElMessage.error("请输入姓名");
    return false;
  }

  //密码不能为空，密码为空报错
  if (password == "") {
    ElMessage.error("请输入密码");
    return false;
  }

  // 检查密码是否符合长度要求，不符合长度要求的代码报错
  if (password.length < 6) {
    ElMessage.error("密码长度不能小于 6 位");
    return false;
  }

  if (email != "") {
    // 检查邮箱是否符合格式要求，不符则报错
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      ElMessage.error("邮箱格式不正确");
      return false;
    }
  }

  // 所有验证通过，返回 true 表示表单有效
  return true;
};

const validateLogin = ({ username, password }) => {
  //输入的用户id不能为空
  if (username == "") {
    ElMessage.error("请输入用户名");
    return false;
  }
  //密码不能为空
  if (password == "") {
    ElMessage.error("请输入密码");
    return false;
  }

  // 所有验证通过，返回 true 表示表单有效
  return true;
};


export { validateLogin, validateRegister}; //只导出一个才用export default
