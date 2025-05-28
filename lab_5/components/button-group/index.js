export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
      <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой" style="display: flex; gap: 12px; align-items: center; justify-content: flex-start;">
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
            <i class="bi bi-eye"></i> Просмотр
        </button>
        <button type="button" 
                class="btn" 
                id="edit-${data.id}"
                style="
                    background-color: #FFE600;
                    border: none;
                    border-radius: 50%;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    box-shadow: none;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
            <img src="https://www.raiffeisen.ru/static/common/initial/fcc_icons/unlocked.svg" alt="edit" style="width: 32px; height: 32px;">
        </button>
      </div>
    `
	}

	addListeners(data, viewListener, editListener, removeListener) {
		const removeBtn = document.getElementById(`remove-${data.id}`);
		const viewBtn = document.getElementById(`view-${data.id}`);
		const editBtn = document.getElementById(`edit-${data.id}`);

		removeBtn.addEventListener('mouseenter', () => {
			removeBtn.style.backgroundColor = '#D0C9C0';
		});
		removeBtn.addEventListener('mouseleave', () => {
			removeBtn.style.backgroundColor = '#E9E4DD';
		});

		viewBtn.addEventListener('mouseenter', () => {
			viewBtn.style.backgroundColor = '#1C1F24';
		});
		viewBtn.addEventListener('mouseleave', () => {
			viewBtn.style.backgroundColor = '#2B2D33';
		});

		editBtn.addEventListener('mouseenter', () => {
			editBtn.style.backgroundColor = '#FFD600';
		});
		editBtn.addEventListener('mouseleave', () => {
			editBtn.style.backgroundColor = '#FFE600';
		});

		removeBtn.addEventListener('click', removeListener);
		viewBtn.addEventListener('click', viewListener);
		editBtn.addEventListener('click', editListener);
	}

	render(data, viewListener, editListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, viewListener, editListener, removeListener)
	}
}
