
const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
	faq.addEventListener("click", () => {
		faq.classList.toggle("active");
	})
});


/* FORMULARIO */ 

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

function doCalc()
{
	zeroBlanks(document.mainform);
	var fv = numval(document.mainform.fv.value);
	var r = numval(document.mainform.r.value)/100;
	var y = numval(document.mainform.y.value);

	document.mainform.pv.value = formatNumber(presentValue(fv,r,y),2);
}
function initForm()
{
	if (window.focus != null) window.focus();
	document.mainform.elements[0].focus();
}

function getCtrlVal(ctrl)
{
	if (ctrl.value != null)
	{
		return ctrl.value;
	}
	else if (ctrl.selectedIndex != null)
	{
		if (ctrl.selectedIndex >= 0)
			return ctrl.options[ctrl.selectedIndex].value;
	}
	else if (ctrl.length != null)
	{
		var i;
		for (i = 0; i < ctrl.length; i++)
		{
			if (ctrl[i].checked) return ctrl[i].value;
		}
	}
	return null;
}

function setCtrlVal(ctrl,val)
{
	if (ctrl.value != null)
	{
		ctrl.value = val;
	}
	else if (ctrl.selectedIndex != null)
	{
		var i;
		for (i = 0; i < ctrl.length; i++)
		{
			if (ctrl.options[i].value == val)
			{
				ctrl.selectedIndex = i;
				break;
			}
		}			
	}
	else if (ctrl.length != null)
	{
		var i;
		for (i = 0; i < ctrl.length; i++)
		{
			if (ctrl[i].value == val)
			{
				ctrl[i].checked = true;
				break;
			}
		}
	}
}

function getHrefParam(paramName)
{
	var i = location.href.indexOf("?" + paramName + "=");
	if (i < 0) i = location.href.indexOf("&" + paramName + "=");
	if (i < 0) return null;

	var j = location.href.indexOf("&", i + 1);
	if (j < 0) j = location.href.length;
	return unescape(location.href.substring(i + 2 + paramName.length, j));
}

function zeroBlanks(formname)
{
	var i, ctrl;
	for (i = 0; i < formname.elements.length; i++)
	{
		ctrl = formname.elements[i];
		if (ctrl.type == "text")
		{
			if (makeNumeric(ctrl.value) == "")
				ctrl.value = "0";
		}
	}
}

function filterChars(s, charList)
{
	var s1 = "" + s; 
	var i;
	for (i = 0; i < s1.length; )
	{
		if (charList.indexOf(s1.charAt(i)) < 0)
			s1 = s1.substring(0,i) + s1.substring(i+1, s1.length);
		else
			i++;
	}
	return s1;
}

function makeNumeric(s)
{
	return filterChars(s, "1234567890.-");
}

function numval(val,digits,minval,maxval)
{
	val = makeNumeric(val);
	if (val == "" || isNaN(val)) val = 0;
	val = parseFloat(val);
	if (digits != null)
	{
		var dec = Math.pow(10,digits);
		val = (Math.round(val * dec))/dec;
	}
	if (minval != null && val < minval) val = minval;
	if (maxval != null && val > maxval) val = maxval;
	return parseFloat(val);
}

function formatNumber(val,digits,minval,maxval)
{
	var sval = "" + numval(val,digits,minval,maxval);
	var i;
	var iDecpt = sval.indexOf(".");
	if (iDecpt < 0) iDecpt = sval.length;
	if (digits != null && digits > 0)
	{
		if (iDecpt == sval.length)
			sval = sval + ".";
		var places = sval.length - sval.indexOf(".") - 1;
		for (i = 0; i < digits - places; i++)
			sval = sval + "0";
	}
	var firstNumchar = 0;
	if (sval.charAt(0) == "-") firstNumchar = 1;
	for (i = iDecpt - 3; i > firstNumchar; i-= 3)
		sval = sval.substring(0, i) + "," + sval.substring(i);

	return sval;
}

function presentValue(fv,r,y)
{
	return fv/Math.pow(1+r,y);
}

const searchButton = document.querySelector("nav .desktop-nav .link-search");
const closeButton = document.querySelector(".search-container .link-close");
const desktopNav = document.querySelector(".desktop-nav");
const searchContainer = document.querySelector(".search-container");
const overlay = document.querySelector(".overlay");

searchButton.addEventListener("click", () => {
    desktopNav.classList.add("hide");
    searchContainer.classList.remove("hide");
    overlay.classList.add("show");
})

closeButton.addEventListener("click", () => {
    desktopNav.classList.remove("hide");
    searchContainer.classList.add("hide");
    overlay.classList.remove("show");
})

overlay.addEventListener("click", () => {
    desktopNav.classList.remove("hide");
    searchContainer.classList.add("hide");
    overlay.classList.remove("show");
})


// Mobile Version

const menuIconContainer = document.querySelector("nav .menu-icon-container");
const navContainer = document.querySelector(".nav-container");

menuIconContainer.addEventListener("click", () => {
    navContainer.classList.toggle("active");
})


const searchBar = document.querySelector(".mobile-search-container .search-bar");
const nav = document.querySelector(".nav-container nav");
const searchInput = document.querySelector(".mobile-search-container input");
const cancelBtn = document.querySelector(".mobile-search-container .cancel-btn");

searchInput.addEventListener("click", () => {
    searchBar.classList.add("active");
    nav.classList.add("move-up");
    desktopNav.classList.add("move-down");
})

cancelBtn.addEventListener("click", () => {
    searchBar.classList.remove("active");
    nav.classList.remove("move-up");
    desktopNav.classList.remove("move-down");
})


