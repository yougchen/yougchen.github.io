var User = []
//user的順序
let username_num;
//取出user總數
var i = parseInt(localStorage.getItem("num"));
//localstorage沒有設定時將i設為0
if (isNaN(i)) {
    var i = 0;
}
$("#session_clear").click(function () {
    sessionStorage.clear();
})
if (sessionStorage.getItem("username")) {
    const username = sessionStorage.getItem("username")
    let login_flag = false;
    for (let num = 1; num <= i; num++) {
        User = JSON.parse(localStorage.getItem("username" + num));
        if (username === User["name"]) {
            login_flag = true;
            username_num = num;
            break;
        }
    }
    if (login_flag == true) {
        $("#reg").remove();
        $("#login").remove();
        $("#loginform").remove();
        $("#loginform2").remove();
        $('body').append(`
    
    <div id="service" class="flex">
        <div class="grid-12">
            <h1>歡迎${username_num}${username}</h1>
            <h1>${username}已登入</h1>
        </div>
    </div>
    `)
    }
    else {
        alert("登入錯誤");
    }
}
alert(username_num);
//註冊
$("#reg").click(function () {
    $("#loginform2").remove();
    $("#loginform").remove();

    $('body').append(`<form method="post" class='login' id='loginform' name="form" action="" accept-charset="utf-8">
    帳號名稱：<input id='username' type='text' name='mem_account_num' required maxlength='15' pattern='.{6,15}'>
    <span style='font-size:15px;'>(只能輸入A-Z,a-z,0-9, 至少6個字, 不超過15個字)</span><br>
    姓名：<input id='mem_name' type='text' name='mem_name' required maxlength='15'>
    <span style='font-size:15px;'>(不超過15個字)</span><br>
    設定密碼：<input id='password' type='password' name='mem_password' required maxlength='10'>
    密碼確認：<input id='password_sure' type='password' name='mem_password' required maxlength='10'><br>
    <span style='font-size:15px;'></span><br>
    電話：<input id='tel' type='tel' name='mem_phone' required placeholder='09xxxxxxxx' pattern='.{9,}' maxlength='10'><br>
    Email：<input id='email' type='email' name='mem_email' required placeholder='example@mail.com'
      pattern='[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}$'><br>
    <button id='btn' type="button">註冊會員</button>
    </form>
    `);
});
//登入
$("#login").click(function () {
    $("#loginform2").remove();
    $("#loginform").remove();

    $('body').append(`
    <form method="get" class='login' id='loginform2' name="form" accept-charset="utf-8">
      帳號名稱：<input id='username2' type='text' name='mem_account_num' required maxlength='15' pattern='.{6,}'>
      密碼：<input id='password2' type='password' name='mem_password' required maxlength='10'>
      <button id='btn' type="button" >登入會員</button>
    </form> `);
});
$("body").on('click', "#loginform2>button", function (e) {
    alert("1");
    e.preventDefault();
    let login_flag = false;
    if ($("#username2").val() == "" || $("#password2").val() == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        alert("2");
        for (let num = 1; num <= i; num++) {
            User = JSON.parse(localStorage.getItem("username" + num));
            if ($("#username2").val() === User["name"] && $("#password2").val() === User["password"]) {
                alert("正確的登入");
                login_flag = true;
                username_num = num;
                sessionStorage.setItem("username", `${$("#username2").val()}`);
                break;
            }
        }
        if (login_flag == true) {

            alert("登入成功!:歡迎" + sessionStorage.getItem("username"));
            const username = sessionStorage.getItem("username")
            $("#reg").remove();
            $("#login").remove();
            $("#loginform").remove();
            $("#loginform2").remove();
            $('body').append(`
    
            <div id="service" class="flex">
                <div class="grid-12">
                <h1>歡迎${username}</h1>
                <h1>${username}已登入</h1>
                </div>
            </div>
            `)
        }
    }
});



$("body").on('click', "#loginform>button", function (e) {

    e.preventDefault();

    let flag = false;
    if ($("#username").val() == "" || $("#password").val() == "") {
        alert("Ensure you input a value in both fields!");
    } else if ($("#password").val() !== $("#password_sure").val()) {
        alert("密码不符");
    } else {
        for (let num = 1; num <= i; num++) {
            User = JSON.parse(localStorage.getItem("username" + num));
            if ($("#username").val() === User["name"]) {
                alert("重複的username" + num);
                flag = true;
                break;
            }
        }
        if (flag == false) {
            i++
            console.log(
                `This form has a username${i} of ${$("#username").val()} and password of ${$("#password").val()}`
            );
            var newUser = {
                name: $("#username").val(),
                password: $("#password").val(),
                mem_name: $("#mem_name").val(),
                tel: $("#tel").val(),
                email: $("#email").val()
            };
            alert(JSON.stringify(newUser));
            localStorage.setItem("username" + i, JSON.stringify(newUser));
            localStorage.setItem("num", `${i}`)

            $("#username").val("");
            $("#password").val("");
            $("#password_sure").val("");
            $("#mem_name").val("");
            $("#tel").val("");
            $("#email").val("");
        } else {
            return
        }
    }
});
