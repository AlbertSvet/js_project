
	// Тут пишем все скрипты
	try {
		const trigerBtn = document.querySelectorAll('.pa-application__review');
		const trigerClose = document.querySelector('.pa-add-comment__close');
		const body = document.querySelector('body');
		const modalParent = document.querySelector('.pa-add-comment');
		
		// очистить массив file
		function clearMass () {
			if(!list.length == 0) {			
				
				list = []; 
				
				while (parents.firstChild) {
				parents.removeChild(parents.firstChild);
				}
				
				spanCout.textContent = 0;
			}
		}
		// отркыть модальное окно
		function openModal (selectorModal){
			const modal = document.querySelector(selectorModal);
			// modal.style.display = 'block';
			modal.classList.add('pa-fade');
			modal.classList.remove('pa-hide');
			body.style.overflow = 'hidden';
		}

		trigerBtn.forEach(item =>{
			item.addEventListener('click', () =>{
				openModal('.pa-add-comment');
			})
		})

		function closeModal(selectorModal){
			const modal = document.querySelector(selectorModal);
			// modal.style.display = 'none';
			modal.classList.remove('pa-fade');
			modal.classList.add('pa-hide');
			textArea.value = '';
			textCount.textContent = 0;
			body.style.overflow = '';
			errorBlock.textContent = '';
			
				
		}

		trigerClose.addEventListener('click', () =>{
			closeModal('.pa-add-comment');	
			clearMass();
						
		})

		modalParent.addEventListener('click', (e) =>{
			if(e.target == modalParent){
				closeModal('.pa-add-comment');	
				clearMass();
			}
		})

		document.addEventListener('keydown', (e) =>{
			if(e.key == 'Escape'){
				closeModal('.pa-add-comment');	
				clearMass();
			}
		})



		// =file 

		const input = document.querySelector('.pa-add-comment__inpFile');
		const parents = document.querySelector('.pa-add-comment__item');
		const spanCout = document.querySelector('.pa-count');
		
		let list = [];
		function updateInput(){
			if(this.files && this.files.length){
				
			const newArr =  Array.from(this.files); 
			
			
			let count = list.length + newArr.length;
				if(count >= 5) {
					spanCout.textContent = 5;
				}else{
					spanCout.textContent = count;
				}

			
				// console.log(count)	
				newArr.forEach(item =>{
					if(list.length >= 5) {
						// / Если длина массива больше или равна 5
							return;
					}else{
						
						list.push(item);					
						const block = document.createElement('div');
						
						block.classList.add('pa-add-comment__subItem')

						// ==============

						const isImage = item.type.startsWith('image/');
						if(isImage) {
							const img = document.createElement('img');
							img.classList.add('pa-prevImg');
							img.src = URL.createObjectURL(item);
							parents.appendChild(block);
							block.appendChild(img);
						}else{
							const icon = document.createElement('img');
							icon.src = 'images/filed.svg';
							icon.style.width = '20px'
							icon.style.height = '20px'
							icon.classList.add('file-icon'); // Класс для иконки файла
							block.appendChild(icon);

							const fileName = document.createElement('p');
							fileName.classList.add('pa-file-name');
							if(item.name.length > 10){
								fileName.textContent = item.name.slice(0, 3) + '...';
							}else{
								fileName.textContent = item.name;
							}
					
							block.appendChild(fileName);
						}
						parents.appendChild(block);

							trigerClose.addEventListener('click', ()=>{
								clearMass();
								
							})
						
												
						
					}
					

		
				})
				
			}
		
		}
		input.addEventListener('change', updateInput);
		
	
		// valid cooment

		const comentBtn = document.querySelector('.pa-add-comment__btn');
		const textArea = document.querySelector('.pa-textarea');
		const errorBlock = document.querySelector('.pa-errorBlock');
		
		comentBtn.addEventListener('click', () =>{
			if(textArea.value == '') {
				errorBlock.textContent = 'Заполните поле';
			}else{
				errorBlock.textContent = '';
			}

		})

		// ========

		const textCount = document.querySelector('.pa-add-comment__text-count');
		function updateTextCount() {
			const textLength = textArea.value.length;
			if (textLength >= 4000) {
				textCount.textContent = '4000'; 
				textArea.value = textArea.value.slice(0, 4000);
			} else {
				textCount.textContent = textLength; 
			}
		}
		updateTextCount();
		textArea.addEventListener('input', updateTextCount);

	}catch(e) {

	}
