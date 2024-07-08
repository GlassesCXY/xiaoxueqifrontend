
import { defineStore } from "pinia";
import{ref} from "vue";

export const useUserStore = defineStore("user",
  ()=>{
   
   let token=ref(sessionStorage.getItem('token') || null);//要是响应式
   let username = ref(sessionStorage.getItem('UserId') || null)
  // 定义 mutations
  
  const   setToken=  (newToken) => {
    
      token.value = newToken;
    
      //缓存存储token
      sessionStorage.setItem("token", newToken);
    }
    const removeToken=  () =>{
      token.value = null;
      //删除缓存存储的token
      sessionStorage.removeItem("token");
    };
    const   setUserId=  (userId)=>  {
        const newUserId = userId;
        sessionStorage.setItem("UserId", newUserId);
    }

  //使用token进行权限控制，并及时释放存储的token


    const setContentId=(Id) =>{
        const newId = Id;
        sessionStorage.setItem("ContentId", newId);
    }
 
return {
  token,
    username,
  setToken,
  removeToken,
  setUserId,
    setContentId,
}
  }
  

   
  

   
  
);
