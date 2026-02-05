function ValidaryGenerar() {
  let isValid = true;

  // Campos estáticos
  const nombre = document.getElementById('nombre');
  const titulo = document.getElementById('Titulo');
  const correo = document.getElementById('correo');
  const telefono = document.getElementById('Telefono');
  const nacimiento = document.getElementById('Nacimiento');
  const linkedin = document.getElementById('linkedin');

  // Limpiar mensajes de error
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  // Validación campos básicos
  if (!nombre.value) {
    document.getElementById('nombre-error').textContent = 'Por favor, ingresa tu nombre.';
    isValid = false;
  }
  if (!titulo.value) {
    document.getElementById('titulo-error').textContent = 'Por favor, ingresa tu título.';
    isValid = false;
  }
  if (!correo.value) {
    document.getElementById('correo-error').textContent = 'Por favor, ingresa tu correo electrónico.';
    isValid = false;
  } else if (!isValidEmail(correo.value)) {
    document.getElementById('correo-error').textContent = 'Por favor, ingresa un correo electrónico válido.';
    isValid = false;
  }
  if (!telefono.value) {
    document.getElementById('telefono-error').textContent = 'Por favor, ingresa tu número de teléfono.';
    isValid = false;
  }
  if (!nacimiento.value) {
    document.getElementById('Nacimiento-error').textContent = 'Por favor, ingresa tu fecha de nacimiento.';
    isValid = false;
  }
  if (!linkedin.value) {
    document.getElementById('linkedin-error').textContent = 'Por favor, ingresa tu enlace de LinkedIn.';
    isValid = false;
  } else if (!isValidUrl(linkedin.value)) {
    document.getElementById('linkedin-error').textContent = 'Por favor, ingresa un enlace de LinkedIn válido.';
    isValid = false;
  }

  // Validar inputs dinámicos: Skills
  const skillsNames = document.querySelectorAll('.skillsName');
  skillsNames.forEach((input, index) => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove()); // quitar mensaje previo si existe
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Este campo es obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
  });

  // Similar para Software
  const softwareNames = document.querySelectorAll('.softwareName');
  softwareNames.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Este campo es obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
  });

  // Similar para Idiomas
  const idiomaNames = document.querySelectorAll('.idiomaName');
  idiomaNames.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Este campo es obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
  });

  const empresaNames = document.querySelectorAll('.empresaName');
  const fechasInicio = document.querySelectorAll('.fechaInicio');
  const fechasFin = document.querySelectorAll('.fechaCulminacion');

  isValid = ValidateDynamicInputs(empresaNames, fechasInicio, fechasFin);

  const institucion = document.querySelectorAll('.institucion');
  const inicioEducacion = document.querySelectorAll('.iniciodeeducacion');
  const finalizacionEducacion = document.querySelectorAll('.finalizacioneducacion');

  isValid = ValidateDynamicInputs(institucion, inicioEducacion, finalizacionEducacion);

  const nombreCertificacion = document.querySelectorAll('.nombreCertificacion');
  const fechaObtencionCertificacion = document.querySelectorAll('.fechaObtencionCertificacion');
  const fechaExpiracion = document.querySelectorAll('.fechaExpiracion');

  isValid = ValidateDynamicInputs(nombreCertificacion, fechaObtencionCertificacion, fechaExpiracion);

  // Si todo válido
  if (isValid) {
    generarCV();
    const contenedores = [
      document.getElementById("skillsConteo"),
      document.getElementById("softwareConteo"),
      document.getElementById("idiomasConteo"),
      document.getElementById("experienciaConteo"),
      document.getElementById("educacionConteo")
    ];

    contenedores.forEach(limpiarContenedor);
  }
}

function ValidateDynamicInputs(input1, input2, input3) {
  let isValid = true;
  input1.forEach((input, i) => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Campo obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
    if (!input2[i].value) {
      isValid = false;
      input2[i].nextElementSibling?.remove();
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Campo obligatorio';
      input2[i].parentNode.appendChild(errorSpan);
    }
    if (!input3[i].value) {
      isValid = false;
      input3[i].nextElementSibling?.remove();
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message text-danger';
      errorSpan.textContent = 'Campo obligatorio';
      input3[i].parentNode.appendChild(errorSpan);
    }
  });

  return isValid;
}

function generarCV() {
  // Limpiar CV anterior
  const container = document.getElementById('cvContainer');
  container.innerHTML = '';

  // Recoger datos del formulario
  const nombre = document.getElementById('nombre').value;
  const titulo = document.getElementById('Titulo').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('Telefono').value;
  const nacimiento = document.getElementById('Nacimiento').value;
  const linkedin = document.getElementById('linkedin').value;

  // Crear contenedor principal
  const cvDiv = document.createElement('div');
  cvDiv.className = 'container mt-5';

  // Crear fila principal
  const row = document.createElement('div');
  row.className = 'row';

  // Columna izquierda (Información personal)
  const leftCol = document.createElement('div');
  leftCol.className = 'col-md-4 bg-light p-3 rounded';

  const nombreHeading = document.createElement('h2');
  nombreHeading.textContent = nombre;

  const tituloHeading = document.createElement('h4');
  tituloHeading.textContent = titulo;

  const personalInfoSection = document.createElement('div');

  const personalInfoHeading = document.createElement('h5');
  personalInfoHeading.textContent = 'Información Personal';

  const emailParagraph = document.createElement('p');
  const strongMail = document.createElement('strong');
  strongMail.textContent = "Email: ";
  emailParagraph.append(strongMail, correo);
  emailParagraph.style.marginTop = '10px';

  const phoneParagraph = document.createElement('p');
  const strongPhone = document.createElement('strong');
  strongPhone.textContent = "Número: ";
  phoneParagraph.append(strongPhone, telefono);

  const dobParagraph = document.createElement('p');
  const strongDob = document.createElement('strong');
  strongDob.textContent = "Fecha de nacimiento: ";
  dobParagraph.append(strongDob, nacimiento);
  
  const linkedinParagraph = document.createElement('p');
  const stronglikdn = document.createElement('strong');
  stronglikdn.textContent = "LinkedIn: ";
  linkedinParagraph.append(stronglikdn, linkedin);

  // Agregar información personal a la columna izquierda
  personalInfoSection.append(personalInfoHeading, emailParagraph, phoneParagraph, dobParagraph, linkedinParagraph);
  leftCol.append(nombreHeading, tituloHeading, personalInfoSection);

   // Agregar Skills
  const skillsNames = document.querySelectorAll('.skillsName');
  const skillsScores = document.querySelectorAll('.skillsPuntuacion');
  if (skillsNames.length) {
    const skillsSection = document.createElement('div');

    const skillsHeading = document.createElement('h5');
    skillsHeading.textContent = 'Habilidades';

    const skillsList = document.createElement('ul');
    skillsNames.forEach((input, i) => {
      const skill = input.value.trim();
      const score = skillsScores[i].value;
      const li = document.createElement('li');
      li.textContent = `${skill} - ${score} / 5`;
      skillsList.appendChild(li);
    });

    skillsSection.append(skillsHeading, skillsList);
    leftCol.appendChild(skillsSection);
  }

  // Agregar Software
  const softwareNames = document.querySelectorAll('.softwareName');
  const softwareScores = document.querySelectorAll('.softwareSelect');
  if (softwareNames.length) {
    const softwareSection = document.createElement('div');

    const softwareHeading = document.createElement('h5');
    softwareHeading.textContent = 'Software';

    const softwareList = document.createElement('ul');
    softwareNames.forEach((input, i) => {
      const software = input.value.trim();
      const score = softwareScores[i].value;
      const li = document.createElement('li');
      li.textContent = `${software} - ${score} / 5`;
      softwareList.appendChild(li);
    });

    softwareSection.append(softwareHeading, softwareList);
    leftCol.appendChild(softwareSection);
  }

  // Agregar Idiomas
  const idiomaNames = document.querySelectorAll('.idiomaName');
  const idiomaScores = document.querySelectorAll('.idiomaSelect');
  if (idiomaNames.length) {
    const idiomaSection = document.createElement('div');

    const idiomaHeading = document.createElement('h5');
    idiomaHeading.textContent = 'Idiomas';

    const idiomaList = document.createElement('ul');
    idiomaNames.forEach((input, i) => {
      const idioma = input.value.trim();
      const score = idiomaScores[i].value;
      const li = document.createElement('li');
      li.textContent = `${idioma} - ${score} / 5`;
      idiomaList.appendChild(li);
    });

    idiomaSection.append(idiomaHeading, idiomaList);
    leftCol.appendChild(idiomaSection);
  }

  // Columna derecha (Experiencia y otras secciones)
  const rightCol = document.createElement('div');
  rightCol.className = 'col-md-8 p-3';


  const resumen = document.getElementById('resumen');
  const resumntext = document.createElement('p');
  resumntext.textContent = resumen.value;
  rightCol.appendChild(resumntext);

  // Agregar Experiencia Laboral
  const experienciaNames = document.querySelectorAll('.empresaName');
  const fechasInicio = document.querySelectorAll('.fechaInicio');
  const fechasFin = document.querySelectorAll('.fechaCulminacion');
  if (experienciaNames.length) {
    const experienciaSection = document.createElement('div');

    const experienciaHeading = document.createElement('h5');
    experienciaHeading.textContent = 'Experiencia Laboral';

    const experienciaList = document.createElement('ul');
    experienciaNames.forEach((input, i) => {
      const empresa = input.value.trim();
      const inicio = fechasInicio[i].value;
      const fin = fechasFin[i].value;
      const li = document.createElement('li');
      li.textContent = `${empresa} (${inicio} - ${fin})`;
      experienciaList.appendChild(li);
    });

    experienciaSection.append(experienciaHeading, experienciaList);
    rightCol.appendChild(experienciaSection);
  }

  // Agregar Educación
  const institucionNames = document.querySelectorAll('.institucion');
  const inicioEducacion = document.querySelectorAll('.iniciodeeducacion');
  const finalizacionEducacion = document.querySelectorAll('.finalizacioneducacion');
  if (institucionNames.length) {
    const educacionSection = document.createElement('div');

    const educacionHeading = document.createElement('h5');
    educacionHeading.textContent = 'Educación';

    const educacionList = document.createElement('ul');
    institucionNames.forEach((input, i) => {
      const institucion = input.value.trim();
      const inicio = inicioEducacion[i].value;
      const fin = finalizacionEducacion[i].value;
      const li = document.createElement('li');
      li.textContent = `${institucion} (${inicio} - ${fin})`;
      educacionList.appendChild(li);
    });

    educacionSection.append(educacionHeading, educacionList);
    rightCol.appendChild(educacionSection);
  }

  // Agregar Certificaciones
  const nombreCertificacion = document.querySelectorAll('.nombreCertificacion');
  const fechaObtencionCertificacion = document.querySelectorAll('.fechaObtencionCertificacion');
  const fechaExpiracion = document.querySelectorAll('.fechaExpiracion');
  if (nombreCertificacion.length) {
    const certificacionSection = document.createElement('div');

    const certificacionHeading = document.createElement('h5');
    certificacionHeading.textContent = 'Certificaciones';

    const certificacionList = document.createElement('ul');
    nombreCertificacion.forEach((input, i) => {
      const certificacion = input.value.trim();
      const fechaObtencion = fechaObtencionCertificacion[i].value;
      const fechaExp = fechaExpiracion[i].value;
      const li = document.createElement('li');
      li.textContent = `${certificacion} (Obtenida: ${fechaObtencion}, Expira: ${fechaExp})`;
      certificacionList.appendChild(li);
    });

    certificacionSection.append(certificacionHeading, certificacionList);
    rightCol.appendChild(certificacionSection);
  }

  // Combinar las columnas en la fila
  row.append(leftCol, rightCol);

  // Agregar fila al contenedor principal
  cvDiv.appendChild(row);

  // Insertar el CV generado en el contenedor
  container.appendChild(cvDiv);
}

//Agregar skills
function Addskills() {
  const skillsCuenta = document.getElementById("skillsConteo");
  const newSkill = document.createElement("div");
  newSkill.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-6";

  const labelob = document.createElement("label");
  labelob.innerText = "Skills";
  divInput.appendChild(labelob);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control skillsName";

  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-md-4";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Puntuacion";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select skillsPuntuacion";

  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = i;
    selectC.appendChild(optionV);
  }
  divVl.appendChild(selectC);
  newSkill.appendChild(divInput);
  newSkill.appendChild(divVl);
  newSkill.appendChild(btnBorrar(newSkill));

  skillsCuenta.appendChild(newSkill);
}

//Agregar software
function Addsoftware() {
  const softwareCuenta = document.getElementById("softwareConteo");
  const newSoftware = document.createElement("div");
  newSoftware.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-6";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Nombre del software";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control softwareName";

  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-md-4";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Puntuacion";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select softwareSelect";

  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = i;
    selectC.appendChild(optionV);
  }
  divVl.appendChild(selectC);
  newSoftware.appendChild(divInput);
  newSoftware.appendChild(divVl);
  newSoftware.appendChild(btnBorrar(newSoftware));

  softwareCuenta.appendChild(newSoftware);
}

//Agregar idiomas...
function AddIdioma() {
  const IdiomasCuenta = document.getElementById("idiomasConteo");
  const newIdioma = document.createElement("div");
  newIdioma.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-6";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Nombre del idioma";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control idiomaName";

  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-md-4";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Puntuacion";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select idiomaSelect";

  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = i;
    selectC.appendChild(optionV);
  }
  divVl.appendChild(selectC);
  newIdioma.appendChild(divInput);
  newIdioma.appendChild(divVl);
  newIdioma.appendChild(btnBorrar(newIdioma));

  IdiomasCuenta.appendChild(newIdioma);
}

//Agregar experiencia laboral
function Addexperiencia() {
  const ExperienciaCuenta = document.getElementById("experienciaConteo");
  const newExperiencia = document.createElement("div");
  newExperiencia.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-4";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Empresa";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control empresaName";

  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-md-3";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de inicio";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control fechaInicio";

  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-md-3";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de culminacion";
  divInput3.appendChild(labelFecha2);

  const crearInput3 = document.createElement("input");
  crearInput3.type = "date";
  crearInput3.className = "form-control fechaCulminacion";

  divInput3.appendChild(crearInput3);

  newExperiencia.appendChild(divInput);
  newExperiencia.appendChild(divInput2);
  newExperiencia.appendChild(divInput3);
  newExperiencia.appendChild(btnBorrar(newExperiencia));

  ExperienciaCuenta.appendChild(newExperiencia);
}

//Agregar historial educativo
function AddEducacion() {
  const EducacionCuenta = document.getElementById("educacionConteo");
  const newEducacion = document.createElement("div");
  newEducacion.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-4";

  const labelEdu = document.createElement("label");
  labelEdu.innerText = "Institucion academica";
  divInput.appendChild(labelEdu);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control institucion";

  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-md-3";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de inicio";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control iniciodeeducacion";

  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-md-3";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de finalizacion";
  divInput3.appendChild(labelFecha2);

  const crearInput3 = document.createElement("input");
  crearInput3.type = "date";
  crearInput3.className = "form-control finalizacioneducacion";

  divInput3.appendChild(crearInput3);

  newEducacion.appendChild(divInput);
  newEducacion.appendChild(divInput2);
  newEducacion.appendChild(divInput3);
  newEducacion.appendChild(btnBorrar(newEducacion));

  EducacionCuenta.appendChild(newEducacion);
}

//Agregar certificaciones
function addCertificacion() {
  const CertificacionesCuenta = document.getElementById("CertificacionesConteo");
  const newCertificacion = document.createElement("div");
  newCertificacion.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-md-4";

  const labelcertfcn = document.createElement("label");
  labelcertfcn.innerText = "Nombre de la certificacion";
  divInput.appendChild(labelcertfcn);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control nombreCertificacion";

  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-md-3";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de obtencion";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control fechaObtencionCertificacion";

  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-md-3";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de expiracion";
  divInput3.appendChild(labelFecha2);

  const crearInput3 = document.createElement("input");
  crearInput3.type = "date";
  crearInput3.className = "form-control fechaExpiracion";

  divInput3.appendChild(crearInput3);

  newCertificacion.appendChild(divInput);
  newCertificacion.appendChild(divInput2);
  newCertificacion.appendChild(divInput3);
  newCertificacion.appendChild(btnBorrar(newCertificacion));

  CertificacionesCuenta.appendChild(newCertificacion);
}

function btnBorrar(row) {
  const divButton = document.createElement("div");
  divButton.setAttribute("class", "col-12 col-md-1 mt-2 mt-md-4 text-md-center text-end");

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-danger");
  btnDelete.setAttribute("type", "button");
  btnDelete.addEventListener("click", function () {
    row.remove();
  });
  const btnborrarimg = document.createElement("i");
  btnborrarimg.setAttribute("class", "fa-solid fa-trash");
  btnDelete.appendChild(btnborrarimg);
  divButton.appendChild(btnDelete);

  return divButton;
}

function limpiarContenedor(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function isValidEmail(correo) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

function isValidUrl(linkedin) {
  try {
    const parseLinkedin = new URL(linkedin);
    return parseLinkedin.protocol === 'https:' && parseLinkedin.hostname.includes('www.linkedin.com');
  } catch (e) {
    return false;
  }
}

