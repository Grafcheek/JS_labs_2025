export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
      <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой">
				<button type="button" 
                class="btn" 
                id="remove-${data.id}"
                style="
                    background-color: #E9E4DD;
                    border: none;
                    color: #2B2D33;
                    border-radius: 25px;
                    padding: 10px 20px;
                    font-family: var(--raif-font);
                    outline: none;
                    box-shadow: none;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
            <i class="bi bi-trash"></i> Удалить
        </button>
        <button type="button" 
                class="btn" 
                id="view-${data.id}"
                style="
                    background-color: #2B2D33;
                    border: none;
                    color: white;
                    border-radius: 25px;
                    padding: 10px 20px;
                    font-family: var(--raif-font);
                    outline: none;
                    box-shadow: none;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
            <i class="bi bi-calculator"></i> Просмотр
        </button>
      </div>
    `
	}

	addListeners(data, viewListener, removeListener) {
		const removeBtn = document.getElementById(`remove-${data.id}`);
		const viewBtn = document.getElementById(`view-${data.id}`);

		// Эффект при наведении для кнопки "Удалить"
		removeBtn.addEventListener('mouseenter', () => {
			removeBtn.style.backgroundColor = '#D0C9C0'; // Темнее на 10%
		});
		removeBtn.addEventListener('mouseleave', () => {
			removeBtn.style.backgroundColor = '#E9E4DD'; // Возвращаем исходный
		});

		// Эффект при наведении для кнопки "Просмотр"
		viewBtn.addEventListener('mouseenter', () => {
			viewBtn.style.backgroundColor = '#1C1F24'; // Темнее на 10%
		});
		viewBtn.addEventListener('mouseleave', () => {
			viewBtn.style.backgroundColor = '#2B2D33'; // Возвращаем исходный
		});

		// Обработчики клика
		removeBtn.addEventListener('click', removeListener);
		viewBtn.addEventListener('click', viewListener);
	}

	render(data, analyzeListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, analyzeListener, removeListener)
	}
}
