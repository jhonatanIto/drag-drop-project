let boxes = document.getElementsByClassName("text");
let searchBox = document.getElementById('searchTextBox');
let explainBox = document.getElementById('explainTextBox');
let concluded = document.getElementById('cocludedTextBox');
let searchColumn = document.getElementById('search');
let explainColumn = document.getElementById('explain');
let concludedColumn = document.getElementById('concluded');
let searchAdd = document.getElementById('searchAddBox');
let explainAdd = document.getElementById('explainAdd');
let concludedAdd = document.getElementById('concludedAdd');
let root = document.getElementById('root');


let selected = null;

function draggable(){
  for( let box of boxes){
  box.setAttribute("draggable", true)

  box.addEventListener("dragstart", function(e){
    selected = e.target;
  });
  }
}
draggable()


explainColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

explainColumn.addEventListener("drop", function(e){
  if(selected) {
      explainBox.appendChild(selected);
      selected = null;
  }
    
});


searchColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

searchColumn.addEventListener("drop", function(e){
  if(selected) {
      searchBox.appendChild(selected);
      selected = null;
  }
    
});

concludedColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

concludedColumn.addEventListener("drop", function(e){
  if(selected) {
      concluded.appendChild(selected);
      selected = null;
  }
    
});
  
  
function modal(column){
  const modalBody = document.createElement('div');
  const box = document.createElement('div');
  const input = document.createElement('input');

  root.appendChild(modalBody);
  modalBody.appendChild(box);
  box.appendChild(input);

  modalBody.classList.add('modalBody');
  box.classList.add('modalBox');
  input.classList.add('modalInput');
  modalBody.id = 'modalBody';
  input.placeholder = 'Insert here'

  input.addEventListener("keydown", function(e){
    if(e.key ==='Enter' && input.value !== ""){
      let text = document.createElement('div');
      text.innerHTML = input.value;
      text.classList.add('text');
      column.appendChild(text)
      input.value = ""
      modalBody.style.display = 'none'
      draggable()
    }
  })
  modalBody.addEventListener("click", function(e){
    if (e.target.id === 'modalBody'){
      modalBody.style.display = 'none'
      console.log(e.target)
    }
  })
}


searchAdd.addEventListener('click', function(){
  modal(searchBox)
});

explainAdd.addEventListener('click', function(){
  modal(explainBox)
});

concludedAdd.addEventListener('click', function(){
  modal(concluded)
});