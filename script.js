
// GLOBBAL SELECTORS -------------
const pagesV = document.querySelectorAll('.main-panel .pages');
const sendRelatorioBtn = document.querySelectorAll('.sections .btn-send-relatorio');
//let downloadBtn = document.querySelectorAll('.relatorio-page .add-relatorio .btn-download');
const gerarRelatorioBtn = document.querySelectorAll('.relatorio-formulario .btn-gerar-relatorio');
let sectionsV = document.querySelectorAll('.grid-container-manequins .sections');
const mediaFidelidadeV = [];
const altaFidelidadeV = [];
// Creting a ArrayV object to store manequim info 
const manequinStorageV = [];
// Flatpicker Library
configDate = {
    dateFormat: "d-m-Y",
}
// Creating an Instance
flatpickr("input[type=dateTime-local]", configDate);

let txt =  ['dede','llolo',34];


// FUNCTIONS --------

    function selectCategories(event){
        let alink = event.target;
        //console.log(alink);
        alink.style = 'text-decoration: underline';
    // foreach que guarda as sections em arrays separadas!  
        sectionsV.forEach( element => {
            let medfidelidadeTag = element.getAttribute('tag');
            if(medfidelidadeTag == 'media'){
                mediaFidelidadeV.push(element);
            }else{
                altaFidelidadeV.push(element);
            }
        });
        let nodeElementClickedName = event.target.parentNode.getAttribute('id');
        //Selecionando as categorias por páginas!
        if(nodeElementClickedName == 'media-fidelidade'){
            altaFidelidadeV.forEach(element => {
                element.setAttribute('style','display:none')
            });
            mediaFidelidadeV.forEach(element => {
                element.setAttribute('style','display:block')
            });
        }else if(nodeElementClickedName == 'alta-fidelidade'){
            mediaFidelidadeV.forEach(element => {
                element.setAttribute('style','display:none')
            });
            altaFidelidadeV.forEach(element => {
                element.setAttribute('style','display:block')
            });
        }else{
            sectionsV.forEach( element => {
                element.setAttribute('style','display:block')
            });
        }

    }
    // Main menu Manipulation
    function showPage(event){

        let elementClickedName = event.target.getAttribute('pageName');
    
        pagesV.forEach(element => {

            let page =  element.getAttribute('pageName');
            
            if (elementClickedName == page ) {  

                element.setAttribute('style','display:block');

                switch(page){
                    case 'relatorio':
                                //update view to empty before leaving!!
                                let relatorioGrid =  document.querySelector('.relatorio-page .relatorio-grid');
                                relatorioGrid.innerHTML =  '';
                                let fromLocalStorage = localStorage.getItem('localStorageV');
                                let convertedV =  JSON.parse(fromLocalStorage);

                                for (let index = 0; index < convertedV.length; index++) {
                                    let position = index;
                                    let simName =  convertedV[index].name;
                                    let simTag = convertedV[index].tag;
                                    let formDate = convertedV[index].date;
                                    relatorioDomCreation(simName,simTag,formDate,position);
                                }
                        break;
                    case 'status' :
                                
                                //update view to empty before leaving!!
                                let relatorioG =  document.querySelector('.status-page .relatorio-grid');
                                relatorioG.innerHTML =  '';
                                let fromLocal = localStorage.getItem('localStorageV');
                                let convertV =  JSON.parse(fromLocal);

                                for (let index = 0; index < convertV.length; index++) {
                                    let position = index;
                                    let simName =  convertV[index].name;
                                    let simCode = convertV[index].code;
                                    //let formDate = convertedV[index].date;
                                    domStatusCreation(simName,simCode,position);
                                }
                         
                    break;  
                }

                /*
                //quando estiver na pagina relatorio!Display no vetor!  
                if(page == 'relatorio'){
                    //update view to empty before leaving!!
                    let relatorioGrid =  document.querySelector('.relatorio-page .relatorio-grid');
                    relatorioGrid.innerHTML =  '';
                    let fromLocalStorage = localStorage.getItem('localStorageV');
                    let convertedV =  JSON.parse(fromLocalStorage);

                    for (let index = 0; index < convertedV.length; index++) {
                        let position = index;
                        let simName =  convertedV[index].name;
                        let simTag = convertedV[index].tag;
                        let formDate = convertedV[index].date;
                        relatorioDomCreation(simName,simTag,formDate,position);
                    }
                  
                    /* This selector needs to be here, becouse its when the page finishes loadig DOM
                    let downloadBtn = document.querySelectorAll('.relatorio-page .add-relatorio .btn-download');
                    console.log('download btn: ', downloadBtn);
                    // Adding anonymos function to all downloaded buttons
                    downloadBtn.forEach( element => {
                        element.onclick = downloadRelatorio();
                     });
                    */ 

            }else {
                element.setAttribute('style','display:none');
            }    
        });
         
    }   

    // Setting eventlistener to buttons!
    sendRelatorioBtn.forEach( element => {
        element.onclick = relatorioFormularioPage;
        //element.setAttribute('onclick','fileDownload()');
    });
    function relatorioFormularioPage(event){
        
        let relatorioGridsV =  document.querySelectorAll('.relatorio-formulario');
        let elementClicked =  event.target.parentNode;
        let manequimNameClicked = elementClicked.firstElementChild.getAttribute('id');
        //let elementClickedTag = elementClicked.parentNode.getAttribute('tag');
       
        relatorioGridsV.forEach(element => {
             let manequimName = element.getAttribute('id');
                 if( manequimNameClicked == manequimName){
                     element.setAttribute('style','display:block');
                     let manequimPage = document.querySelector('.manequins-page');
                     manequimPage.setAttribute('style','display:none');
 
                 }else{
                     element.setAttribute('style','display:none');
                 }
        });
        
     }
 
     // Adding a function to all gerar relatorio btns!
    gerarRelatorioBtn.forEach( element =>{
        element.setAttribute('onclick','gerarRelatorio(event)');
    });
     // When the gerarRelatorio is trigger, this will happen
     // Create a global selector ! for each manequim instead of one by one
     // link manequin information with his code, and store de code in mainV 
    function gerarRelatorio(event){

            let textV = [];
            
            //Global selector!!
            let panelFooter = event.target.parentNode;
            let secondPanel = panelFooter.parentNode;
            let firstPanel = secondPanel.previousElementSibling;
            let gridManequinContainer = secondPanel.parentNode;
            let likedPageBtn = gridManequinContainer.parentNode;
            //let ressusciInputBoxes =  document.querySelectorAll('#ressusciAnne .manequim-resources-list .check-boxes');
            let inputBoxes = likedPageBtn.querySelectorAll('.manequim-resources-list .check-boxes');
            // getting manequinCode by its invisible atribute!
            let manequinCode =  likedPageBtn.querySelector('.form-select option:checked');
            // if manequin code is the first element of my dropdown menu than.....
            let dropdownCodeFirstChild =  likedPageBtn.querySelector('.form-select option:first-child');
        
            //Go through each dropdowncode element and get the lenght of it 
            // The number of positions in mainV should be equal to the lenght of the dropdownCode
            let dropdownForm = likedPageBtn.querySelector('.form-select');
            //selecting tags 
            let manequinTags = likedPageBtn.getAttribute('tag');
            //Becouse linked page is referencig each page a can, select with the ID
            let pageDate = likedPageBtn.querySelector('input[id="myDate"]');
          
            //validacao de manequim
            if(dropdownCodeFirstChild.value == manequinCode.value){
                    alert('Selecione codigo do Manequim!');

            }else{ 

                inputBoxes.forEach(element => {
                    if(element.checked){
                        let textSelected =  element.parentNode.textContent;
                        textV.push(textSelected);  
                    }
                });

                //obejeto preenchido
                let manequinInfo = {
                    name: likedPageBtn.id,
                    code: manequinCode.value,
                    info: textV,
                    tag: manequinTags,
                    date: pageDate.value,
                    
                };

                //Validating and updating Quantity!
                let quantity = firstPanel.querySelector('.quantity span:first-child');
                let totalContent = quantity.textContent;
                
                if(totalContent>0){

                    let updateAtribute = totalContent - 1;
                    quantity.innerText = '';
                    quantity.append(updateAtribute);
                   
                    manequinStorageV.push(manequinInfo);
                    //console.log('manquin StorageV: ',manequinStorageV);
                      
                    alert('Relatorio Gerado com Sucesso!'); 
                    //After de btn is cliked , remove all checked checkboxes
                    inputBoxes.forEach( element =>{ 
                        if(element.checked){
                            element.checked = false;
                        }
                    });
                    //RESET DEFAULT VALUES OF DROPDOWNS
                    pageDate.value = '';
                    dropdownForm.value = dropdownForm.firstElementChild.innerText;
                    
                }else{
                
                    alert('Todos os simuladores '+ likedPageBtn.id +' já foram relatados!');
                    
                }

                 
            }

            //convert and send!
            const manequinVString = JSON.stringify(manequinStorageV);
            localStorage.setItem('localStorageV',manequinVString);

    }
   
    //Relatorio-Page DOM Creation 
    function relatorioDomCreation(manequinName,tag,date,position){
        
        let relatorioGrid = document.querySelector('.relatorio-grid');
        let addRelatorioClass = document.createElement('div');
        addRelatorioClass.className = 'add-relatorio';
        addRelatorioClass.setAttribute('position',position);
        let timeLineImgsClass =  document.createElement('div');
        timeLineImgsClass.className = 'timeline-imgs';
        let imgGreenLine =  document.createElement('img');
        imgGreenLine.src = './linegreenline.png';
        imgGreenLine.className = 'line-img';
        let imgPolygon =  document.createElement('img');
        imgPolygon.src ='./point.png' ;
        imgPolygon.className = 'polygon-img';
        timeLineImgsClass.append(imgGreenLine);
        timeLineImgsClass.append(imgPolygon);
        addRelatorioClass.append(timeLineImgsClass);
        let textContentClass = document.createElement('div');
        textContentClass.className = 'text-content';
        let relatorioDate = document.createElement('p');
        relatorioDate.innerText = 'Data: ' + date;
        textContentClass.append(relatorioDate);
        let manequinNameParagraph = document.createElement('p');
        manequinNameParagraph.innerText = 'Simulador: ' + manequinName;
        textContentClass.append(manequinNameParagraph);
        let manequinTagParagraph = document.createElement('p');
        manequinTagParagraph.innerText = 'Tipo: ' + tag;
        textContentClass.append(manequinTagParagraph);
        let label = document.createElement('label');
        textContentClass.append(label);
        let selectElement = document.createElement('select');
        selectElement.name = 'dropdown';
        selectElement.id = 'tipo-de-arquivo';
        selectElement.style.color = '#302727';
        selectElement.style.backgroundColor = '#c6d0d8';
        let optionPdf = document.createElement('option');
        optionPdf.value = 'pdf';
        optionPdf.innerText = 'Arquivo pdf';
        selectElement.append(optionPdf);
        let optionExcel = document.createElement('option');
        optionExcel.value = 'xlsx';
        optionExcel.innerText = 'Arquivo Excel';
        selectElement.append(optionExcel);
        textContentClass.append(selectElement);
        let btnDownload =  document.createElement('button');
        btnDownload.className = 'btn-download';
        btnDownload.innerText = 'Download';
        //On the creation of the button, a function is applied
        btnDownload.setAttribute('onclick','downloadRelatorio(event)');
        textContentClass.append(btnDownload);
        addRelatorioClass.append(textContentClass);
        relatorioGrid.append(addRelatorioClass);
   
    }
    // THIS function is being called from domRELATORIO CREATION 
    function downloadRelatorio(event){ 

        let textContentClassParent = event.target.parentNode;
        let fileTypeDropDown = textContentClassParent.querySelector('select[id="tipo-de-arquivo"]');
        // Getting the relatorio postion from localSotrageV 
        // Sett btn cliked to position of Relatorio
        let btnCliked = event.target;
        let btnTextContentClass = btnCliked.parentNode;
        let addRelatorioClassBtn = btnTextContentClass.parentNode;
        let relatorioPosition = addRelatorioClassBtn.getAttribute('position');

            if(fileTypeDropDown.value == 'pdf'){
                //Arquivo PDF 
                generatePDF(relatorioPosition);
            }else{
                //Arquivo EXCEL 
                alert('xxxxxxxxxxxxxxxxxx');
            }   
    }
    //STATUS-Page DOM Creation 
    function domStatusCreation(sName,sCode,index){
        const relatorioGrid = document.querySelector('.status-page .relatorio-grid');
        let addRelatorioClass = document.createElement('div');
        addRelatorioClass.className = 'add-relatorio';
        addRelatorioClass.setAttribute('position',index);
        let timeLineImgsClass =  document.createElement('div');
        timeLineImgsClass.className = 'timeline-imgs';
        let imgGreenLine =  document.createElement('img');
        imgGreenLine.src = './linegreenline.png';
        imgGreenLine.className = 'line-img';
        let imgPolygon =  document.createElement('img');
        imgPolygon.src ='./point.png' ;
        imgPolygon.className = 'polygon-img';
        timeLineImgsClass.append(imgGreenLine);
        timeLineImgsClass.append(imgPolygon);
        addRelatorioClass.append(timeLineImgsClass);
        let textContentClass = document.createElement('div');
        textContentClass.className = 'text-content';
        let paragraphName = document.createElement('p');
        paragraphName.innerText = 'Simulador: ';
        let spanName = document.createElement('span');
        spanName.innerHTML = sName;
        paragraphName.appendChild(spanName);
        textContentClass.append(paragraphName);
        let paragraphCode = document.createElement('p');
        paragraphCode.innerText = 'Codigo: ' + sCode;
        textContentClass.append(paragraphCode);
        let paragraphStatus = document.createElement('p');
        paragraphStatus.innerHTML ='Status: '
        let spanStatus = document.createElement('span');
        paragraphStatus.appendChild(spanStatus);
        spanStatus.innerText = 'ABERTO' ;
        textContentClass.append(paragraphStatus);
        let label = document.createElement('label');
        label.innerText = 'Definir ';
        textContentClass.append(label);
        let selectElement = document.createElement('select');
        selectElement.name = 'dropdown';
        selectElement.id = 'tipo-de-arquivo';
        //selectElement.style.color = '#302727';
        //selectElement.style.backgroundColor = '#c6d0d8';
        let optionOpen = document.createElement('option');
        optionOpen.value = 'ABERTO';
        optionOpen.innerText = 'ABERTO';
        selectElement.append(optionOpen);
        let optionClosed = document.createElement('option');
        optionClosed.value = 'FECHADO';
        optionClosed.innerText = 'FECHADO';
        selectElement.append(optionClosed);
        textContentClass.append(selectElement);
        let btnConfirm =  document.createElement('button');
        btnConfirm.className = 'btn-confirm';
        btnConfirm.innerText = 'Confirmar';
        //On the creation of the button, a function is applied
        btnConfirm.setAttribute('onclick','getStatus(event)');
        textContentClass.append(btnConfirm);
        addRelatorioClass.append(textContentClass);
        relatorioGrid.append(addRelatorioClass);
    }
    // THIS function is being called from domStatus CREATION 
    function getStatus(event){

        let section = event.target.parentNode.parentNode;
        let sectionPosition = section.getAttribute('position');
        let dropdownSelection = event.target.previousElementSibling;
        let selectedStatus = dropdownSelection.value;

        const grid = document.querySelectorAll('.status-page .relatorio-grid .add-relatorio');
        
        for(let index = 0 ; index < grid.length; index++){
            let element = grid[index];
            let textContent = element.querySelector('.text-content');
            let elementIndex =  index;
            if(elementIndex == sectionPosition){
                
                let statusParagraph = textContent.querySelector('p:nth-child(3) span');
                statusParagraph.innerText = '';
                statusParagraph.append(selectedStatus);
                switch(selectedStatus){
                    case'FECHADO':
                        //GETTING THE SIMULATOR NAME FROM STATUS PAGE
                        let simulatorName = textContent.querySelector('p:nth-child(1) span');
                        //GETTING THE SIMULATOR NAME FROM RELATORIO PAGE
                        let relatoriosV = document.querySelectorAll('.panels .relatorio-formulario');
                        for (let i = 0; i < relatoriosV.length; i++) {
                            const element = relatoriosV[i];
                            let pageName = element.id;
                            
                            if(pageName == simulatorName.textContent){
                                let simulatorQuantitySpan = element.querySelector('.first-panel .quantity span');
                                let simulatorQuantityValue = simulatorQuantitySpan.getAttribute('total');
                                simulatorQuantitySpan.textContent = '';
                                simulatorQuantitySpan.append(simulatorQuantityValue);
                                console.log('os nomes sao iguais!')
                                console.log('element matched: ',element,'element quantitty: ',simulatorQuantityValue);


                            }else{
                                console.log('os nomes diferem!!!!');
                            }
                        }

                    break;
                    case 'ABERTO':
                        console.log('STATUS ABERTO , NADA ACONTECE!');
                    break
                }

                
            }
            else{
                //nothing happens!
            }
            
        }

    
    }
    // Create a global selector, to know each page you are in !
    // Select the checkBox All of that page and then mark all checkboxes!
    var selectALLBoxes = document.querySelectorAll('.second-panel .all-check-boxes input[type="checkbox"]');

    selectALLBoxes.forEach(element => {
    //element.setAttribute('onclick','returnCheckBoxPage(event)');
        element.onclick = checkAllBoxes;
    });
    
    function checkAllBoxes(event){

     let checkBoxSelected =  event.target;
     let checkBoxParentNode = checkBoxSelected.parentNode;
     let secondPanelClass =  checkBoxParentNode.parentNode;
     let resourcesList = secondPanelClass.querySelector('div:nth-child(4)');
     let inputBoxes = resourcesList.querySelectorAll('.container input');

     if(checkBoxSelected.checked){
        inputBoxes.forEach(element => {
            element.setAttribute('checked','');
          });
        
        }else{
        inputBoxes.forEach(element => {
            element.removeAttribute('checked');
          });
        }
     
  }
   
  function generatePDF(relPosition){
    
    let fromLocalStorage = localStorage.getItem('localStorageV');
    let convertedV =  JSON.parse(fromLocalStorage);
    
    const doc = new jsPDF();

    doc.text("Relatorio", 105, 15, null, null, "center");
    doc.setFontSize(15);
    doc.setFontType("normal");
    let element = convertedV[relPosition];
    doc.text("Relato de todas as falhas registradas no",20, 35);
    doc.text("dia "+ element.date,20,40);
    let infoV = element.info;
    doc.setFontSize(15);
    doc.setFont("times", "italic");
    doc.text("Nome do simulador: "+ element.name,20, 50);
    doc.text("Codigo do simulador: "+ element.code,20, 60);
    doc.text("Falhas registradas ", 105, 70, null, null, "center");
    for (let i = 0; i < infoV.length; i++) {
        const info = infoV[i];
        doc.text(info,20, 85 + i*7);// para cada linha no infoV pular x6 no pdf
    }

    doc.save("Relatorio do simulador.pdf");
}

