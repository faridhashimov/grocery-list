window.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.input__item'),
    inputForm = document.querySelector('.input-form'),
    submit = document.querySelector('.submit__item'),
    itemsField = document.querySelector('.items-field'),
    clearItems = document.querySelector('.clear__items'),
    alertField = document.querySelector('.alert');

  let element;
  let parentEl;

  inputForm.addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();

    if (input.value === '' || input.value === null) {
      input.classList.add('warning');
      alert('Please Enter Value', '#E66B6B');
    } else if (submit.textContent !== 'Edit') {
      input.classList.remove('warning');
      addItem();
      alert('Item Added To The List', '#6BE675');
    } else if (submit.textContent === 'Edit') {
      parentEl.parentElement.firstElementChild.textContent = input.value;
      alert('Value Changed', '#6BE675');
      submit.textContent = 'Submit';
      inputForm.reset();
    }
  });

  function addItem() {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
          <p class="item__name">${input.value}</p>
          <div class="edit__remove">
            <button class="edit"> <i class="fas fa-edit"></i> </button>  
            <button class="remove"> <i class="fas fa-trash"></i> </button>
          </div> 
      `;
    itemsField.appendChild(item);
    clearItems.classList.remove('hide');
    inputForm.reset();
  }

  function removeItem() {
    itemsField.addEventListener('click', (e) => {
      const element = e.target;
      const parentEl = element.parentElement.parentElement;
      if (
        element &&
        element.tagName == 'I' &&
        element.classList.contains('fa-trash')
      ) {
        parentEl.parentElement.remove();
        alert('Item Removed', '#E66B6B');
      }
    });
  }

  function alert(text, color) {
    alertField.innerHTML = `${text}`;
    alertField.style.background = `${color}`;
    setTimeout(() => {
      alertField.innerHTML = ' ';
      alertField.style.background = '#fff';
    }, 1000);
  }

  itemsField.addEventListener('click', (e) => {
    element = e.target;
    parentEl = element.parentElement.parentElement;
    if (
      element &&
      element.tagName == 'I' &&
      element.classList.contains('fa-edit')
    ) {
      input.value = parentEl.parentElement.firstElementChild.textContent;
      submit.textContent = 'Edit';
    }
  });

  clearItems.addEventListener('click', () => {
    itemsField.innerHTML = '';
    alert('Empty List', '#E66B6B');
    setTimeout(() => {
      clearItems.classList.add('hide');
    }, 500);
  });

  removeItem();
});
