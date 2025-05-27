(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class m{constructor(e){this.parent=e}getHTML(){return`
    <div class="templates-card">
        <div class="card-body-custom">
            <button id="add-card-button" type="button" style="color:#2B2D33; font-size:200px; border:none; min-width:400px;min-height:312px;">+</button>
        </div>
    </div>`}addListeners(e){document.getElementById("add-card-button").addEventListener("click",e)}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class u{constructor(e){this.parent=e}getHTML(e){return`
      <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой">
				<button type="button" 
                class="btn" 
                id="remove-${e.id}"
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
                id="view-${e.id}"
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
    `}addListeners(e,t,r){const n=document.getElementById(`remove-${e.id}`),s=document.getElementById(`view-${e.id}`);n.addEventListener("mouseenter",()=>{n.style.backgroundColor="#D0C9C0"}),n.addEventListener("mouseleave",()=>{n.style.backgroundColor="#E9E4DD"}),s.addEventListener("mouseenter",()=>{s.style.backgroundColor="#1C1F24"}),s.addEventListener("mouseleave",()=>{s.style.backgroundColor="#2B2D33"}),n.addEventListener("click",r),s.addEventListener("click",t)}render(e,t,r){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(e,t,r)}}class b{constructor(e){this.parent=e}getHTML(e){return`
    <div class="carousel-container">
        <div id="carousel-${e.id}" class="carousel slide" >
			  <div class="carousel-indicators">
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
            <div class="carousel-inner">
                ${e.elements.map((t,r)=>`
                    <div style="margin-bottom:5%" class="carousel-item ${r===0?"active":""}">
                        <img src="${t.src}" alt="Icon ${t.title}" style="width: 300px; height: 80px; object-fit: contain; margin-bottom: 5px; margin-right: auto;">
						<h3 style="font-size:20px; margin-top: 0;">${t.title}</h3>
						<p>${t.description}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    </div>`}render(e){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t)}}class p{constructor(e){this.parent=e,this.buttonGroup=new u(e),this.carousel=new b(e)}getHTML(e){return`
    <div class="templates-card" data-id="${e.id}">
        <div class="card-body-custom">
            <h5 class="card-title-custom">${e.title}</h5>
            <p class="card-text-custom">
                <i class="bi bi-pencil-square"></i> 
                Элементов: ${e.elements.length}
            </p>
            ${this.carousel.getHTML(e)}
            <div class="button-group-container">
                ${this.buttonGroup.getHTML(e)}
            </div>
        </div>
    </div>`}render(e,t,r){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.buttonGroup.addListeners(e,t,r)}}class c{constructor(e){this.parent=e}addListeners(e){document.getElementById("home-button").addEventListener("click",e)}getHTML(){return`
    <button id="home-button" style="padding: 0; border: none; background: none;">
		<img src="https://www.raiffeisen.ru/static/common/initial/Footer/LogotypeRetail.svg" 
			alt="Raiffeisen Logo" 
			width="40" 
			height="40" 
			class="d-inline-block align-top">
    </button>`}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class h{constructor(e,t){this.parent=e,this.onSearch=t}getHTML(){return`
        <div class="search-filter-container p-3" style="background-color: #F5F6F7;">
            <div class="input-group">
                <input type="text" 
                       id="searchInput" 
                       class="form-control" 
                       placeholder="Поиск по названию шаблона..." 
                       aria-label="Поиск по названию шаблона">
                <button class="btn" id="searchButton" style="
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
                    <i class="bi bi-search"></i> Поиск
                </button>
                <button class="btn" type="button" id="clearSearch" style="
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
                    <i class="bi bi-x-lg"></i> Очистить
                </button>
            </div>
        </div>`}addListeners(){const e=document.getElementById("searchInput"),t=document.getElementById("searchButton"),r=document.getElementById("clearSearch");t.addEventListener("mouseenter",()=>{t.style.backgroundColor="#1C1F24"}),t.addEventListener("mouseleave",()=>{t.style.backgroundColor="#2B2D33"}),r.addEventListener("mouseenter",()=>{r.style.backgroundColor="#D0C9C0"}),r.addEventListener("mouseleave",()=>{r.style.backgroundColor="#E9E4DD"}),t.addEventListener("click",()=>{this.onSearch(e.value.trim().toLowerCase())}),e.addEventListener("keypress",n=>{n.key==="Enter"&&this.onSearch(e.value.trim().toLowerCase())}),r.addEventListener("click",()=>{e.value="",this.onSearch("")})}render(){this.parent.insertAdjacentHTML("afterbegin",this.getHTML()),this.addListeners()}}class g{async get(e){console.log("GET request to:",e);try{const t=await fetch(e),r=await t.json();return console.log("GET response:",r),{data:r,status:t.status}}catch(t){throw console.error("GET error:",t),t}}async post(e,t){console.log("POST request to:",e),console.log("POST data:",t);try{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await r.json();return console.log("POST response:",n),{data:n,status:r.status}}catch(r){throw console.error("POST error:",r),r}}async put(e,t){console.log("PUT request to:",e),console.log("PUT data:",t);try{const r=await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await r.json();return console.log("PUT response:",n),{data:n,status:r.status}}catch(r){throw console.error("PUT error:",r),r}}async delete(e){console.log("DELETE request to:",e);try{const t=await fetch(e,{method:"DELETE"}),r=await t.json();return console.log("DELETE response:",r),{data:r,status:t.status}}catch(t){throw console.error("DELETE error:",t),t}}}const l=new g;class v{constructor(){this.baseUrl="http://localhost:8000"}getTemplates(){return`${this.baseUrl}/bank-products`}getTemplatesWithSearch(e){return`${this.baseUrl}/bank-products?title=${encodeURIComponent(e)}`}getTemplateById(e){return`${this.baseUrl}/bank-products/${e}`}createTemplate(){return`${this.baseUrl}/bank-products`}updateTemplate(e){return`${this.baseUrl}/bank-products/${e}`}deleteTemplate(e){return`${this.baseUrl}/bank-products/${e}`}}const i=new v;class f{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("add-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>

        <div id="add-page" class="container mt-4">
            <h2>Добавить новую карточку</h2>
            <form id="add-form" class="mt-4">
                <div class="mb-3">
                    <label for="title" class="form-label">Название карточки</label>
                    <input type="text" class="form-control" id="title" required>
                </div>

                <h4 class="mt-4">Элемент 1</h4>
                <div class="mb-3">
                    <label for="element1-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element1-title" required>
                </div>
                <div class="mb-3">
                    <label for="element1-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element1-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element1-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element1-src" required>
                </div>

                <h4 class="mt-4">Элемент 2</h4>
                <div class="mb-3">
                    <label for="element2-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element2-title" required>
                </div>
                <div class="mb-3">
                    <label for="element2-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element2-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element2-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element2-src" required>
                </div>

                <h4 class="mt-4">Элемент 3</h4>
                <div class="mb-3">
                    <label for="element3-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element3-title" required>
                </div>
                <div class="mb-3">
                    <label for="element3-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element3-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element3-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element3-src" required>
                </div>

                <button type="submit" class="btn btn-primary mt-4">Добавить карточку</button>
            </form>
        </div>
        `}clickBack(){new d(this.parent).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new c(e).render(this.clickBack.bind(this)),document.getElementById("add-form").addEventListener("submit",async n=>{n.preventDefault();const s={title:document.getElementById("title").value,elements:[{title:document.getElementById("element1-title").value,description:document.getElementById("element1-description").value,src:document.getElementById("element1-src").value},{title:document.getElementById("element2-title").value,description:document.getElementById("element2-description").value,src:document.getElementById("element2-src").value},{title:document.getElementById("element3-title").value,description:document.getElementById("element3-description").value,src:document.getElementById("element3-src").value}]};try{const o=await l.post(i.createTemplate(),s);o.status===201?this.clickBack():console.error("Ошибка создания карточки:",o.status)}catch(o){console.error("Ошибка при создании карточки:",o)}})}}class y{constructor(e,t){this.parent=e,this.cardId=t}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>

        <div id="edit-page" class="container mt-4">
            <h2>Редактировать карточку</h2>
            <form id="edit-form" class="mt-4">
                <div class="mb-3">
                    <label for="title" class="form-label">Название карточки</label>
                    <input type="text" class="form-control" id="title" required>
                </div>

                <h4 class="mt-4">Элемент 1</h4>
                <div class="mb-3">
                    <label for="element1-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element1-title" required>
                </div>
                <div class="mb-3">
                    <label for="element1-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element1-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element1-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element1-src" required>
                </div>
                <div class="mb-3">
                    <label for="element1-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element1-comment">
                </div>

                <h4 class="mt-4">Элемент 2</h4>
                <div class="mb-3">
                    <label for="element2-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element2-title" required>
                </div>
                <div class="mb-3">
                    <label for="element2-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element2-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element2-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element2-src" required>
                </div>
                <div class="mb-3">
                    <label for="element2-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element2-comment">
                </div>

                <h4 class="mt-4">Элемент 3</h4>
                <div class="mb-3">
                    <label for="element3-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element3-title" required>
                </div>
                <div class="mb-3">
                    <label for="element3-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element3-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element3-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element3-src" required>
                </div>
                <div class="mb-3">
                    <label for="element3-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element3-comment">
                </div>

                <button type="submit" class="btn btn-primary mt-4">Сохранить изменения</button>
            </form>
        </div>
        `}clickBack(){new d(this.parent).render()}async loadCardData(){try{const e=await l.get(i.getTemplateById(this.cardId));e.status===200&&e.data?(document.getElementById("title").value=e.data.title,e.data.elements.forEach((t,r)=>{const n=r+1;document.getElementById(`element${n}-title`).value=t.title,document.getElementById(`element${n}-description`).value=t.description,document.getElementById(`element${n}-src`).value=t.src,document.getElementById(`element${n}-comment`).value=t.comments||""})):(console.error("Ошибка загрузки данных карточки:",e.status),this.clickBack())}catch(e){console.error("Ошибка при загрузке данных карточки:",e),this.clickBack()}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new c(e).render(this.clickBack.bind(this)),this.loadCardData(),document.getElementById("edit-form").addEventListener("submit",async n=>{n.preventDefault();const s={id:this.cardId,title:document.getElementById("title").value,elements:[{title:document.getElementById("element1-title").value,description:document.getElementById("element1-description").value,src:document.getElementById("element1-src").value,comments:document.getElementById("element1-comment").value},{title:document.getElementById("element2-title").value,description:document.getElementById("element2-description").value,src:document.getElementById("element2-src").value,comments:document.getElementById("element2-comment").value},{title:document.getElementById("element3-title").value,description:document.getElementById("element3-description").value,src:document.getElementById("element3-src").value,comments:document.getElementById("element3-comment").value}]};try{const o=await l.put(i.updateTemplate(this.cardId),s);o.status===200?this.clickBack():console.error("Ошибка обновления карточки:",o.status)}catch(o){console.error("Ошибка при обновлении карточки:",o)}})}}class d{constructor(e){this.parent=e,this.data=[],this.handleSearch=this.handleSearch.bind(this)}async getData(){try{const e=await l.get(i.getTemplates());e.status===200&&e.data?(this.data=e.data,this.renderCards(this.data,!0)):(console.error("Ошибка получения данных:",e.status),this.data=[],this.renderCards(this.data,!0))}catch(e){console.error("Ошибка при получении данных:",e),this.data=[],this.renderCards(this.data,!0)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        <!-- Добавляем контейнер для фильтра -->
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
        `}async handleSearch(e){try{if(e){const t=await l.get(i.getTemplatesWithSearch(e));t.status===200&&t.data?this.renderCards(t.data,!1):(console.error("Ошибка получения данных при поиске:",t.status),this.renderCards([],!1))}else await this.getData()}catch(t){console.error("Ошибка при поиске:",t),this.renderCards([],!1)}}renderCards(e,t){this.pageRoot.innerHTML="",e.forEach(r=>{new p(this.pageRoot).render(r,()=>this.clickCard(r.id),()=>this.handleRemoveCard(r.id))}),t&&new m(this.pageRoot).render(()=>this.handleAddCard())}clickCard(e){new y(this.parent,e).render()}handleAddCard(){new f(this.parent).render()}async handleRemoveCard(e){try{const t=await l.delete(i.deleteTemplate(e));t.status===200?(this.data=this.data.filter(r=>r.id!==e),this.renderCards(this.data,!0)):console.error("Ошибка удаления карточки:",t.status)}catch(t){console.error("Ошибка при удалении карточки:",t)}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new c(e).render();const r=document.getElementById("search-filter-container");new h(r,this.handleSearch).render(),this.getData()}}const E=document.getElementById("root"),B=new d(E);B.render();
