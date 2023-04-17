function btnpressed(){
  var u1= document.getElementById("username").value;
  var p1=document.getElementById("password").value;
  if (u1 == "" || u1.length <= 8){
    document.getElementById("username").style.borderColor="red";
  }

  if (p1 == "" || p1.length <= 6){
    document.getElementById("password").style.borderColor="red";
  }
      

}