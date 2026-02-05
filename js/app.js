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
  if (!nombre.value.trim()) {
    document.getElementById('nombre-error').textContent = 'Por favor, ingresa tu nombre.';
    isValid = false;
  }
  if (!titulo.value.trim()) {
    document.getElementById('titulo-error').textContent = 'Por favor, ingresa tu título.';
    isValid = false;
  }
  if (!correo.value.trim()) {
    document.getElementById('correo-error').textContent = 'Por favor, ingresa tu correo electrónico.';
    isValid = false;
  } else if (!isValidEmail(correo.value)) {
    document.getElementById('correo-error').textContent = 'Por favor, ingresa un correo electrónico válido.';
    isValid = false;
  }
  if (!telefono.value.trim()) {
    document.getElementById('telefono-error').textContent = 'Por favor, ingresa tu número de teléfono.';
    isValid = false;
  }
  if (!nacimiento.value) {
    document.getElementById('Nacimiento-error').textContent = 'Por favor, ingresa tu fecha de nacimiento.';
    isValid = false;
  }
  if (!linkedin.value.trim()) {
    document.getElementById('linkedin-error').textContent = 'Por favor, ingresa tu enlace de LinkedIn.';
    isValid = false;
  } else if (!isValidUrl(linkedin.value)) {
    document.getElementById('linkedin-error').textContent = 'Por favor, ingresa un enlace de LinkedIn válido.';
    isValid = false;
  }

  // Validar inputs dinámicos: Skills
  const skillsNames = document.querySelectorAll('.skillsName');
  skillsNames.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
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
      errorSpan.className = 'error-message';
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
      errorSpan.className = 'error-message';
      errorSpan.textContent = 'Este campo es obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
  });

  // Validar experiencia laboral
  const empresaNames = document.querySelectorAll('.empresaName');
  const fechasInicio = document.querySelectorAll('.fechaInicio');
  const fechasFin = document.querySelectorAll('.fechaCulminacion');

  if (!ValidateDynamicInputs(empresaNames, fechasInicio, fechasFin)) {
    isValid = false;
  }

  // Validar educación
  const institucion = document.querySelectorAll('.institucion');
  const inicioEducacion = document.querySelectorAll('.iniciodeeducacion');
  const finalizacionEducacion = document.querySelectorAll('.finalizacioneducacion');

  if (!ValidateDynamicInputs(institucion, inicioEducacion, finalizacionEducacion)) {
    isValid = false;
  }

  // Validar certificaciones
  const nombreCertificacion = document.querySelectorAll('.nombreCertificacion');
  const fechaObtencionCertificacion = document.querySelectorAll('.fechaObtencionCertificacion');
  const fechaExpiracion = document.querySelectorAll('.fechaExpiracion');

  if (!ValidateDynamicInputs(nombreCertificacion, fechaObtencionCertificacion, fechaExpiracion)) {
    isValid = false;
  }

  // Si todo válido
  if (isValid) {
    generarCV();
    // Scroll suave al CV generado
    setTimeout(() => {
      document.getElementById('cvContainer').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  } else {
    // Scroll al primer error
    const firstError = document.querySelector('.error-message:not(:empty)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function ValidateDynamicInputs(input1, input2, input3) {
  let isValid = true;
  input1.forEach((input, i) => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      errorSpan.textContent = 'Campo obligatorio';
      input.parentNode.appendChild(errorSpan);
    }
    if (input2[i] && !input2[i].value) {
      isValid = false;
      input2[i].parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      errorSpan.textContent = 'Campo obligatorio';
      input2[i].parentNode.appendChild(errorSpan);
    }
    if (input3[i] && !input3[i].value) {
      isValid = false;
      input3[i].parentNode.querySelectorAll('.error-message').forEach(el => el.remove());
      const errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
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

  // Crear card principal
  const card = document.createElement('div');
  card.className = 'card shadow-lg';

  // Crear fila principal
  const row = document.createElement('div');
  row.className = 'row g-0';

  // Columna izquierda (Información personal)
  const leftCol = document.createElement('div');
  leftCol.className = 'col-md-4';

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

  const phoneParagraph = document.createElement('p');
  const strongPhone = document.createElement('strong');
  strongPhone.textContent = "Teléfono: ";
  phoneParagraph.append(strongPhone, telefono);

  const dobParagraph = document.createElement('p');
  const strongDob = document.createElement('strong');
  strongDob.textContent = "Fecha de Nacimiento: ";
  dobParagraph.append(strongDob, formatDate(nacimiento));
  
  const linkedinParagraph = document.createElement('p');
  const linkedinLink = document.createElement('a');
  linkedinLink.href = linkedin;
  linkedinLink.target = '_blank';
  linkedinLink.textContent = 'Ver LinkedIn';
  linkedinLink.style.color = 'white';
  linkedinLink.style.textDecoration = 'underline';
  const strongLinkedin = document.createElement('strong');
  strongLinkedin.textContent = "LinkedIn: ";
  linkedinParagraph.append(strongLinkedin, linkedinLink);

  // Agregar información personal a la columna izquierda
  personalInfoSection.append(personalInfoHeading, emailParagraph, phoneParagraph, dobParagraph, linkedinParagraph);
  leftCol.append(nombreHeading, tituloHeading, personalInfoSection);

  // Agregar Skills
  const skillsNames = document.querySelectorAll('.skillsName');
  const skillsScores = document.querySelectorAll('.skillsPuntuacion');
  if (skillsNames.length && skillsNames[0].value.trim()) {
    const skillsSection = document.createElement('div');
    const skillsHeading = document.createElement('h5');
    skillsHeading.textContent = 'Habilidades';
    const skillsList = document.createElement('ul');
    
    skillsNames.forEach((input, i) => {
      if (input.value.trim()) {
        const skill = input.value.trim();
        const score = skillsScores[i].value;
        const li = document.createElement('li');
        li.textContent = `${skill} - ${getNivelText(score)}`;
        skillsList.appendChild(li);
      }
    });

    skillsSection.append(skillsHeading, skillsList);
    leftCol.appendChild(skillsSection);
  }

  // Agregar Software
  const softwareNames = document.querySelectorAll('.softwareName');
  const softwareScores = document.querySelectorAll('.softwareSelect');
  if (softwareNames.length && softwareNames[0].value.trim()) {
    const softwareSection = document.createElement('div');
    const softwareHeading = document.createElement('h5');
    softwareHeading.textContent = 'Software';
    const softwareList = document.createElement('ul');
    
    softwareNames.forEach((input, i) => {
      if (input.value.trim()) {
        const software = input.value.trim();
        const score = softwareScores[i].value;
        const li = document.createElement('li');
        li.textContent = `${software} - ${getNivelText(score)}`;
        softwareList.appendChild(li);
      }
    });

    softwareSection.append(softwareHeading, softwareList);
    leftCol.appendChild(softwareSection);
  }

  // Agregar Idiomas
  const idiomaNames = document.querySelectorAll('.idiomaName');
  const idiomaScores = document.querySelectorAll('.idiomaSelect');
  if (idiomaNames.length && idiomaNames[0].value.trim()) {
    const idiomaSection = document.createElement('div');
    const idiomaHeading = document.createElement('h5');
    idiomaHeading.textContent = 'Idiomas';
    const idiomaList = document.createElement('ul');
    
    idiomaNames.forEach((input, i) => {
      if (input.value.trim()) {
        const idioma = input.value.trim();
        const score = idiomaScores[i].value;
        const li = document.createElement('li');
        li.textContent = `${idioma} - ${getNivelText(score)}`;
        idiomaList.appendChild(li);
      }
    });

    idiomaSection.append(idiomaHeading, idiomaList);
    leftCol.appendChild(idiomaSection);
  }

  // Columna derecha (Experiencia y otras secciones)
  const rightCol = document.createElement('div');
  rightCol.className = 'col-md-8';

  // Resumen profesional
  const resumen = document.getElementById('resumen');
  if (resumen.value.trim()) {
    const resumenSection = document.createElement('div');
    resumenSection.style.marginBottom = '25px';
    
    const resumenHeading = document.createElement('h5');
    resumenHeading.textContent = 'Perfil Profesional';
    
    const resumenText = document.createElement('p');
    resumenText.textContent = resumen.value;
    resumenText.style.textAlign = 'justify';
    
    resumenSection.append(resumenHeading, resumenText);
    rightCol.appendChild(resumenSection);
  }

  // Agregar Experiencia Laboral
  const experienciaNames = document.querySelectorAll('.empresaName');
  const fechasInicio = document.querySelectorAll('.fechaInicio');
  const fechasFin = document.querySelectorAll('.fechaCulminacion');
  if (experienciaNames.length && experienciaNames[0].value.trim()) {
    const experienciaSection = document.createElement('div');
    const experienciaHeading = document.createElement('h5');
    experienciaHeading.textContent = 'Experiencia Laboral';
    const experienciaList = document.createElement('ul');
    
    experienciaNames.forEach((input, i) => {
      if (input.value.trim()) {
        const empresa = input.value.trim();
        const inicio = formatDate(fechasInicio[i].value);
        const fin = formatDate(fechasFin[i].value);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${empresa}</strong><br>${inicio} - ${fin}`;
        experienciaList.appendChild(li);
      }
    });

    experienciaSection.append(experienciaHeading, experienciaList);
    rightCol.appendChild(experienciaSection);
  }

  // Agregar Educación
  const institucionNames = document.querySelectorAll('.institucion');
  const inicioEducacion = document.querySelectorAll('.iniciodeeducacion');
  const finalizacionEducacion = document.querySelectorAll('.finalizacioneducacion');
  if (institucionNames.length && institucionNames[0].value.trim()) {
    const educacionSection = document.createElement('div');
    const educacionHeading = document.createElement('h5');
    educacionHeading.textContent = 'Educación';
    const educacionList = document.createElement('ul');
    
    institucionNames.forEach((input, i) => {
      if (input.value.trim()) {
        const institucion = input.value.trim();
        const inicio = formatDate(inicioEducacion[i].value);
        const fin = formatDate(finalizacionEducacion[i].value);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${institucion}</strong><br>${inicio} - ${fin}`;
        educacionList.appendChild(li);
      }
    });

    educacionSection.append(educacionHeading, educacionList);
    rightCol.appendChild(educacionSection);
  }

  // Agregar Certificaciones
  const nombreCertificacion = document.querySelectorAll('.nombreCertificacion');
  const fechaObtencionCertificacion = document.querySelectorAll('.fechaObtencionCertificacion');
  const fechaExpiracion = document.querySelectorAll('.fechaExpiracion');
  if (nombreCertificacion.length && nombreCertificacion[0].value.trim()) {
    const certificacionSection = document.createElement('div');
    const certificacionHeading = document.createElement('h5');
    certificacionHeading.textContent = 'Certificaciones';
    const certificacionList = document.createElement('ul');
    
    nombreCertificacion.forEach((input, i) => {
      if (input.value.trim()) {
        const certificacion = input.value.trim();
        const fechaObtencion = formatDate(fechaObtencionCertificacion[i].value);
        const fechaExp = formatDate(fechaExpiracion[i].value);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${certificacion}</strong><br>Obtenida: ${fechaObtencion} | Expira: ${fechaExp}`;
        certificacionList.appendChild(li);
      }
    });

    certificacionSection.append(certificacionHeading, certificacionList);
    rightCol.appendChild(certificacionSection);
  }

  // Combinar las columnas en la fila
  row.append(leftCol, rightCol);

  // Agregar fila a la card
  card.appendChild(row);

  // Agregar card al contenedor principal
  cvDiv.appendChild(card);

  // Insertar el CV generado en el contenedor
  container.appendChild(cvDiv);
}

// Agregar skills
function Addskills() {
  const skillsCuenta = document.getElementById("skillsConteo");
  const newSkill = document.createElement("div");
  newSkill.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-6 mb-2 mb-md-0";

  const labelob = document.createElement("label");
  labelob.innerText = "Habilidad";
  divInput.appendChild(labelob);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control skillsName";
  crearInput.placeholder = "Ej. Desarrollo web";
  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Nivel (1-5)";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select skillsPuntuacion";

  const niveles = ['Básico', 'Elemental', 'Intermedio', 'Avanzado', 'Experto'];
  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = `${i} - ${niveles[i-1]}`;
    selectC.appendChild(optionV);
  }
  
  divVl.appendChild(selectC);
  newSkill.appendChild(divInput);
  newSkill.appendChild(divVl);
  newSkill.appendChild(btnBorrar(newSkill));

  skillsCuenta.appendChild(newSkill);
}

// Agregar software
function Addsoftware() {
  const softwareCuenta = document.getElementById("softwareConteo");
  const newSoftware = document.createElement("div");
  newSoftware.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-6 mb-2 mb-md-0";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Nombre del Software";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control softwareName";
  crearInput.placeholder = "Ej. Adobe Photoshop";
  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Nivel (1-5)";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select softwareSelect";

  const niveles = ['Básico', 'Elemental', 'Intermedio', 'Avanzado', 'Experto'];
  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = `${i} - ${niveles[i-1]}`;
    selectC.appendChild(optionV);
  }
  
  divVl.appendChild(selectC);
  newSoftware.appendChild(divInput);
  newSoftware.appendChild(divVl);
  newSoftware.appendChild(btnBorrar(newSoftware));

  softwareCuenta.appendChild(newSoftware);
}

// Agregar idiomas
function AddIdioma() {
  const IdiomasCuenta = document.getElementById("idiomasConteo");
  const newIdioma = document.createElement("div");
  newIdioma.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-6 mb-2 mb-md-0";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Idioma";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control idiomaName";
  crearInput.placeholder = "Ej. Inglés";
  divInput.appendChild(crearInput);

  const divVl = document.createElement("div");
  divVl.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelPnts = document.createElement("label");
  labelPnts.innerText = "Nivel (1-5)";
  divVl.appendChild(labelPnts);

  const selectC = document.createElement("select");
  selectC.className = "form-select idiomaSelect";

  const niveles = ['Básico', 'Elemental', 'Intermedio', 'Avanzado', 'Nativo'];
  for (let i = 1; i <= 5; i++) {
    const optionV = document.createElement("option");
    optionV.value = i;
    optionV.text = `${i} - ${niveles[i-1]}`;
    selectC.appendChild(optionV);
  }
  
  divVl.appendChild(selectC);
  newIdioma.appendChild(divInput);
  newIdioma.appendChild(divVl);
  newIdioma.appendChild(btnBorrar(newIdioma));

  IdiomasCuenta.appendChild(newIdioma);
}

// Agregar experiencia laboral
function Addexperiencia() {
  const ExperienciaCuenta = document.getElementById("experienciaConteo");
  const newExperiencia = document.createElement("div");
  newExperiencia.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelNmb = document.createElement("label");
  labelNmb.innerText = "Empresa";
  divInput.appendChild(labelNmb);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control empresaName";
  crearInput.placeholder = "Ej. Microsoft";
  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de Inicio";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control fechaInicio";
  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de Culminación";
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

// Agregar historial educativo
function AddEducacion() {
  const EducacionCuenta = document.getElementById("educacionConteo");
  const newEducacion = document.createElement("div");
  newEducacion.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelEdu = document.createElement("label");
  labelEdu.innerText = "Institución Académica";
  divInput.appendChild(labelEdu);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control institucion";
  crearInput.placeholder = "Ej. Instituto Tecnológico de las Américas";
  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de Inicio";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control iniciodeeducacion";
  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de Finalización";
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

// Agregar certificaciones
function addCertificacion() {
  const CertificacionesCuenta = document.getElementById("CertificacionesConteo");
  const newCertificacion = document.createElement("div");
  newCertificacion.className = "row mb-3";

  const divInput = document.createElement("div");
  divInput.className = "col-12 col-md-4 mb-2 mb-md-0";

  const labelcertfcn = document.createElement("label");
  labelcertfcn.innerText = "Nombre de la Certificación";
  divInput.appendChild(labelcertfcn);

  const crearInput = document.createElement("input");
  crearInput.type = "text";
  crearInput.className = "form-control nombreCertificacion";
  crearInput.placeholder = "Ej. Certificación de Seguridad";
  divInput.appendChild(crearInput);

  const divInput2 = document.createElement("div");
  divInput2.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha1 = document.createElement("label");
  labelFecha1.innerText = "Fecha de Obtención";
  divInput2.appendChild(labelFecha1);

  const crearInput2 = document.createElement("input");
  crearInput2.type = "date";
  crearInput2.className = "form-control fechaObtencionCertificacion";
  divInput2.appendChild(crearInput2);

  const divInput3 = document.createElement("div");
  divInput3.className = "col-12 col-md-3 mb-2 mb-md-0";

  const labelFecha2 = document.createElement("label");
  labelFecha2.innerText = "Fecha de Expiración";
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
  divButton.className = "col-12 col-md-2 d-flex align-items-end justify-content-end mt-2 mt-md-0";

  const btnDelete = document.createElement("button");
  btnDelete.className = "btn btn-danger";
  btnDelete.type = "button";
  btnDelete.addEventListener("click", function () {
    row.remove();
  });
  
  const btnborrarimg = document.createElement("i");
  btnborrarimg.className = "fa-solid fa-trash";
  btnDelete.appendChild(btnborrarimg);
  divButton.appendChild(btnDelete);

  return divButton;
}

function isValidEmail(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

function isValidUrl(linkedin) {
  try {
    const parseLinkedin = new URL(linkedin);
    return parseLinkedin.protocol === 'https:' && parseLinkedin.hostname.includes('linkedin.com');
  } catch (e) {
    return false;
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('es-ES', options);
}

function getNivelText(nivel) {
  const niveles = {
    '1': 'Básico',
    '2': 'Elemental',
    '3': 'Intermedio',
    '4': 'Avanzado',
    '5': 'Experto/Nativo'
  };
  return niveles[nivel] || nivel;
}