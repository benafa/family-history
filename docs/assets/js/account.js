(()=>{"use strict";async function e(){var e={email:"",user_id:""};try{await new Promise(((e,t)=>{let a=0;const i=setInterval((()=>{"undefined"!=typeof MemberSpace?(clearInterval(i),e()):(a+=100,a>=1e4&&(clearInterval(i),t("MemberSpace did not become available within the maximum wait time.")))}),100)}));const t=await new Promise(((e,t)=>{if(MemberSpace.ready)try{e(window.MemberSpace.getMemberInfo())}catch(e){t("Error fetching MemberSpace member info: "+e)}else{const a=({detail:i})=>{try{e(i)}catch(e){t("Error in MemberSpace.ready event: "+e)}document.removeEventListener("MemberSpace.ready",a)};document.addEventListener("MemberSpace.ready",a)}}));t&&t.isLoggedIn&&(e.email=t.memberInfo.email,e.user_id=t.memberInfo.id)}catch(e){}return e}const t="https://api.colombochetty.com/",a=t+"api/authenticate",i=t+"auth/logout",n=t+"auth/refresh_token",o=new class{async login(e,t){const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"});if(!a.ok)throw a}async logout(e){const t=await fetch(e,{method:"POST",credentials:"include"});if(!t.ok)throw t}async refreshToken(e){const t=this.getCookie("csrf_refresh_token"),a=await fetch(e,{method:"POST",credentials:"include",headers:{"X-CSRF-TOKEN-REFRESH":t}});if(!a.ok)throw a}async getRestData(e){const t=await fetch(e,{method:"GET",credentials:"include"});if(!t.ok)throw t;return await t.text()}async getGraphQLData(e,t){const a=this.getCookie("csrf_access_token"),i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN-ACCESS":a},body:JSON.stringify({query:t}),credentials:"include"});if(!i.ok)throw i;return await i.json()}getCookie(e){let t=null;if(document.cookie&&""!==document.cookie){const a=document.cookie.split(";");for(let i=0;i<a.length;i++){const n=a[i].trim();if(n.substring(0,e.length+1)===e+"="){t=decodeURIComponent(n.substring(e.length+1));break}}}return t}};new class{constructor(e,t,a,i,n,o){this.loginUrl=e,this.logoutUrl=a,this.refreshUrl=t,this.memberspace_tokenName=i,this.redirectPage=n,this.apiClient=o}async handleGraphQLError(e,t,a){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getGraphQLData(t,a);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleRestError(e,t){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getRestData(t);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleUnauthorizedError(t){const a=await t.json();if("Token has expired"===a.msg)await this.handleRefresh();else{if('Missing cookie "access_token_cookie"'!==a.msg)throw t;{const t=await e();await this.apiClient.login(this.loginUrl,t)}}}async handleRefresh(){try{await this.apiClient.refreshToken(this.refreshUrl)}catch(e){throw this.handleLogout(),e}}async handleLogout(){localStorage.removeItem(this.memberspace_tokenName),await this.apiClient.logout(this.logoutUrl),window.location.href=this.redirectPage}isUnauthorizedError(e){return e instanceof Response&&401===e.status}isSigFailure(e){return e instanceof Response&&422===e.status}}(a,n,i,"MemberSpaceWidget.token","/account",o);document.addEventListener("MemberSpace.ready",(({detail:e})=>{for(var t=document.getElementsByClassName("account_info"),a=0;a<t.length;a++)t[a].style.display="block";const{memberInfo:i}=e;if(i){for(t=document.getElementsByClassName("site_info"),a=0;a<t.length;a++)t[a].style.display="none";document.getElementById("page-title").textContent="Account Homepage"}else{for(t=document.getElementsByClassName("site_info"),a=0;a<t.length;a++)t[a].style.display="block";document.getElementById("page-title").textContent="Login or create an account"}})),document.addEventListener("MemberSpace.member.logout",(()=>{o.logout(i)}))})();