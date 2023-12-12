import { apiClient, logoutUrl} from '../fetch/fetch_data';

const handleReady = ({ detail }) => {
  var elements = document.getElementsByClassName('account_info');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = 'block';
  }

  const { memberInfo } = detail;

  if (memberInfo) {
    //console.log(memberInfo.email)
    var elements = document.getElementsByClassName('site_info');

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }

    // using textContent
	var title = document.getElementById('page-title');
	title.textContent = 'Account Homepage'; 
  } else {
  	var elements = document.getElementsByClassName('site_info');

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
    }

    // using textContent
	var title = document.getElementById('page-title');
	title.textContent = 'Login or create an account';
  }
}

const handleLogout = () => {
    console.log("Logout of flask app");
    apiClient.logout(logoutUrl);
}

document.addEventListener('MemberSpace.ready', handleReady);
document.addEventListener('MemberSpace.member.logout', handleLogout);