(()=>{"use strict";async function e(){var e={email:"",user_id:""};try{await new Promise(((e,t)=>{let i=0;const a=setInterval((()=>{"undefined"!=typeof MemberSpace?(clearInterval(a),e()):(i+=100,i>=1e4&&(clearInterval(a),t("MemberSpace did not become available within the maximum wait time.")))}),100)}));const t=await new Promise(((e,t)=>{if(MemberSpace.ready)try{e(window.MemberSpace.getMemberInfo())}catch(e){t("Error fetching MemberSpace member info: "+e)}else{const i=({detail:a})=>{try{e(a)}catch(e){t("Error in MemberSpace.ready event: "+e)}document.removeEventListener("MemberSpace.ready",i)};document.addEventListener("MemberSpace.ready",i)}}));t&&t.isLoggedIn&&(e.email=t.memberInfo.email,e.user_id=t.memberInfo.id)}catch(e){}return e}const t="https://api.colombochetty.com/",i=t+"api/authenticate",a=t+"auth/logout",n=t+"auth/refresh_token",r={tree:t+"api/tree/",individuals:t+"api/individuals/"},o=new class{async login(e,t){const i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"});if(!i.ok)throw i}async logout(e){const t=await fetch(e,{method:"POST",credentials:"include"});if(!t.ok)throw t}async refreshToken(e){const t=this.getCookie("csrf_refresh_token"),i=await fetch(e,{method:"POST",credentials:"include",headers:{"X-CSRF-TOKEN-REFRESH":t}});if(!i.ok)throw i}async getRestData(e){const t=await fetch(e,{method:"GET",credentials:"include"});if(!t.ok)throw t;return await t.text()}async getGraphQLData(e,t){const i=this.getCookie("csrf_access_token"),a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN-ACCESS":i},body:JSON.stringify({query:t}),credentials:"include"});if(!a.ok)throw a;return await a.json()}getCookie(e){let t=null;if(document.cookie&&""!==document.cookie){const i=document.cookie.split(";");for(let a=0;a<i.length;a++){const n=i[a].trim();if(n.substring(0,e.length+1)===e+"="){t=decodeURIComponent(n.substring(e.length+1));break}}}return t}},s=new class{constructor(e,t,i,a,n,r){this.loginUrl=e,this.logoutUrl=i,this.refreshUrl=t,this.memberspace_tokenName=a,this.redirectPage=n,this.apiClient=r}async handleGraphQLError(e,t,i){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getGraphQLData(t,i);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleRestError(e,t){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getRestData(t);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleUnauthorizedError(t){const i=await t.json();if("Token has expired"===i.msg)await this.handleRefresh();else{if('Missing cookie "access_token_cookie"'!==i.msg)throw t;{const t=await e();await this.apiClient.login(this.loginUrl,t)}}}async handleRefresh(){try{await this.apiClient.refreshToken(this.refreshUrl)}catch(e){throw this.handleLogout(),e}}async handleLogout(){localStorage.removeItem(this.memberspace_tokenName),await this.apiClient.logout(this.logoutUrl),window.location.href=this.redirectPage}isUnauthorizedError(e){return e instanceof Response&&401===e.status}isSigFailure(e){return e instanceof Response&&422===e.status}}(i,n,a,"MemberSpaceWidget.token","/account",o);async function c(e){try{const t=await async function(e,t){const i=r[e]+t;try{return await o.getRestData(i)}catch(e){return await s.handleRestError(e,i)}}("individuals",e);document.getElementById("person-content").innerHTML=t,document.querySelectorAll(".view-tree").forEach((function(t){t.addEventListener("click",(function(){localStorage.setItem("tree_id",e),window.location.href="/dynamic"}))}))}catch(e){throw e}}document.addEventListener("DOMContentLoaded",(async function(){const e=function(){const e=window.location.pathname.split("/");return e[e.length-1]}();await c(e)}))})();