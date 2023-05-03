var cart = [];
if (sessionStorage.getItem("cart")) {
    cart = JSON.parse(sessionStorage.getItem("cart"));
    alert(cart);
}
// localStorage.clear();
sessionStorage.clear();
var User = []

let login = document.getElementById("login")
let loginForm = document.getElementById("loginform");
//取出user總數
var i = parseInt(localStorage.getItem("num"));
//localstorage沒有設定時將i設為0
if (isNaN(i)) {
    var i = 0;
}
var Shopp_num = 0;

let username_num;
// login.addEventListener("click", function () {
//   loginForm.remove();
//   $("#loginform2").remove();

//   $('body').append(`
//   <form method="post" class='login' id='loginform2' name="form" action="" accept-charset="utf-8">
//     帳號名稱：<input id='username' type='text' name='mem_account_num' required maxlength='15' pattern='.{6,}'>
//     密碼：<input id='password' type='password' name='mem_password' required maxlength='10'>
//     <input type='submit' name='button' id='button' value='登入會員'>
//   </form> `);
// });
let loginForm2 = document.getElementById("loginform2");

loginForm2.addEventListener("submit", function (e) {
    e.preventDefault();
    let login_flag = false;
    let username = document.getElementById("username2");
    let password = document.getElementById("password2");
    if (username.value == "" || password.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        for (let num = 1; num <= i; num++) {
            User = JSON.parse(localStorage.getItem("username" + num));
            if (username.value === User["name"] && password.value === User["password"]) {
                alert("正確的登入");
                login_flag = true;
                username_num = num;
                sessionStorage.setItem("username" + username_num, `${username.value}`);
                break;
            }
        }
        if (login_flag == true) {

            alert("登入成功!:歡迎" + sessionStorage.getItem("username" + username_num));
            loginForm2.remove();
            $("#login").remove();
            loginForm.remove();
        }
    }
});



loginForm.addEventListener("submit", function (e) {
    i++;
    e.preventDefault();

    let flag = false;
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let mem_name = document.getElementById("mem_name");
    let tel = document.getElementById("tel");
    let email = document.getElementById("email");
    if (username.value == "" || password.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        for (let num = 1; num < i; num++) {
            User = JSON.parse(localStorage.getItem("username" + num));
            if (username.value === User["name"]) {
                alert("重複的username" + num);
                flag = true;
                break;
            }
        }
        if (flag == false) {
            // perform operation with form input
            alert("This form has been successfully submitted!");
            console.log(
                `This form has a username${i} of ${username.value} and password of ${password.value}`
            );
            var newUser = {
                name: username.value,
                password: password.value,
                mem_name: mem_name.value,
                tel: tel.value,
                email: email.value
            };
            alert(JSON.stringify(newUser));
            localStorage.setItem("username" + i, JSON.stringify(newUser));
            // localStorage.setItem("username" + i, `${username.value}`)
            // localStorage.setItem("password" + i, `${password.value}`)
            localStorage.setItem("num", `${i}`)
            // localStorage.setItem("mem_name" + i, `${mem_name.value}`)

            username.value = "";
            password.value = "";
            mem_name.value = "";
            tel.value = "";
            email.value = "";
        }
        else {
            i--;
        }
    }
});
function setCart() {
    var cartList = "", s_price = 0, total = 0;
    for (let $i = 0; $i < cart.length; $i++) {
        s_price = cart[$i]["price"] * cart[$i]["quantity"];
        total += s_price;
        cartList += `<li> ${cart[$i]["goods"]} , 單價: ${cart[$i]["price"]}, 數量: ${cart[$i]["quantity"]
            }, 總價: ${s_price}</li>`;
    }
    $("#cart")
        .empty()
        .append(cartList);
    $("#total").text(total);
}
$("#clear").click(function () {
    cart = [];
    sessionStorage.removeItem("cart");
    setCart();
});

// corsUrl是為了讓codepen可以順利讓底下sourceUrl能回傳資料所寫上的url
const corsUrl = 'https://cors-anywhere.herokuapp.com/'
const sourceUrl = 'https://data.coa.gov.tw/api/v1/AgriProductsTransType/?Start_time=107.07.01&End_time=107.07.10'
const url = sourceUrl;

function printData(data) {
    $('.loading').remove()
    // let dataObj = JSON.parse(data)
    for (let i = 0; i < data['Data'].length; i++) {

        $('body').append(`
          <div class="card">
            
            <div class="info">
                <div class="card-body">
                <button class="btn btn-info btn-block add_cart" id="shopping" onclick="insert(this)">加到購物車</button>
                    <p id="1">${data['Data'][i]['TransDate']}</p>
                    <p id="2">${data['Data'][i]['CropCode']}</p>
                    <p id="3">${data['Data'][i]['CropName']}</p>
                    <p id="4">${data['Data'][i]['Avg_Price']}</p>
                <input type="number" class="form-control amount">
            </div>
          </div>
        `)
    }


}

function getCrop() {
    $.ajax({
        url,
        type: 'GET',
        success: data => printData(data),
        error: err => console.log(err)
    })
}

$(() => {
    getCrop()
})

function insert(ct1) {
    let product = $(ct1).closest(".card-body");
    const goods = $(ct1).parent('div').children('p#2').html();
    const price = $(ct1).parent('div').children('p#4').html();
    alert($(ct1).closest(".card-body").html());
    if (sessionStorage.getItem("username" + username_num) === null) {
        alert("is null");
    }
    else {
        const username = sessionStorage.getItem("username" + username_num);
        alert(sessionStorage.getItem("username" + username_num));
        alert(username_num);

        let count = 1;

        alert($(ct1).parent('div').html());
        var newItem = {
            name: username,
            goods: goods,
            price: price,
            quantity: product.find(".amount").val()

        };
        cart.push(newItem);
        alert(JSON.stringify(cart));
        sessionStorage.setItem("cart", JSON.stringify(cart));
        setCart();
    }
}
