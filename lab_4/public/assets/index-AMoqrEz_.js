(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class h{constructor(e){this.parent=e}getHTML(){return`
    <div class="templates-card" style="width: 340px; height: 400px; display: flex; align-items: center; justify-content: center;">
        <div class="card-body-custom" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <button id="add-card-button" type="button" style="color:#2B2D33; font-size:120px; border:none; background: #F5F6F7; border-radius: 50%; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); line-height: 1; padding: 0; text-align: center;">+</button>
        </div>
    </div>`}addListeners(e){document.getElementById("add-card-button").addEventListener("click",e)}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class m{constructor(e){this.parent=e}getHTML(e){return`
      <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой" style="display: flex; gap: 12px; align-items: center; justify-content: flex-start;">
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
            <i class="bi bi-eye"></i> Просмотр
        </button>
        <button type="button" 
                class="btn" 
                id="edit-${e.id}"
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
    `}addListeners(e,t,r,s){const n=document.getElementById(`remove-${e.id}`),o=document.getElementById(`view-${e.id}`),c=document.getElementById(`edit-${e.id}`);n.addEventListener("mouseenter",()=>{n.style.backgroundColor="#D0C9C0"}),n.addEventListener("mouseleave",()=>{n.style.backgroundColor="#E9E4DD"}),o.addEventListener("mouseenter",()=>{o.style.backgroundColor="#1C1F24"}),o.addEventListener("mouseleave",()=>{o.style.backgroundColor="#2B2D33"}),c.addEventListener("mouseenter",()=>{c.style.backgroundColor="#FFD600"}),c.addEventListener("mouseleave",()=>{c.style.backgroundColor="#FFE600"}),n.addEventListener("click",s),o.addEventListener("click",t),c.addEventListener("click",r)}render(e,t,r,s){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(e,t,r,s)}}class p{constructor(e){this.parent=e,this.buttonGroup=new m(e)}getHTML(e){return`
    <div class="templates-card" data-id="${e.id}" style="width: 340px; height: 400px; display: flex; flex-direction: column;">
        <div class="card-body-custom" style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0; overflow: hidden;">
            <img src="${e.src}" class="card-img-top" alt="${e.title}" style="height: 150px; object-fit: cover;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; overflow: hidden;">
                <div style="flex: 1 1 auto; min-height: 0; overflow: hidden;">
                    <h5 class="card-title-custom" style="margin-bottom: 10px;">${e.title}</h5>
                    <p class="card-text-custom" style="margin-bottom: 10px; color: #444; font-size: 1rem;">
                        ${e.description}
                    </p>
                    ${e.comments?`<p class="card-comments"><i class="bi bi-chat"></i> ${e.comments}</p>`:""}
                </div>
                <div class="button-group-container" style="margin-top: auto;">
                    ${this.buttonGroup.getHTML(e)}
                </div>
            </div>
        </div>
    </div>`}render(e,t,r,s){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.buttonGroup.addListeners(e,t,r,s)}}class l{constructor(e){this.parent=e}addListeners(e){document.getElementById("home-button").addEventListener("click",e)}getHTML(){return`
    <button id="home-button" style="padding: 0; border: none; background: none;">
		<img src="https://www.raiffeisen.ru/static/common/initial/Footer/LogotypeRetail.svg" 
			alt="Raiffeisen Logo" 
			width="40" 
			height="40" 
			class="d-inline-block align-top">
    </button>`}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class g{async get(e){console.log("GET request to:",e);try{const t=await fetch(e),r=await t.json();return console.log("GET response:",r),{data:r,status:t.status}}catch(t){throw console.error("GET error:",t),t}}async post(e,t){console.log("POST request to:",e),console.log("POST data:",t);try{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await r.json();return console.log("POST response:",s),{data:s,status:r.status}}catch(r){throw console.error("POST error:",r),r}}async put(e,t){console.log("PUT request to:",e),console.log("PUT data:",t);try{const r=await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await r.json();return console.log("PUT response:",s),{data:s,status:r.status}}catch(r){throw console.error("PUT error:",r),r}}async delete(e){console.log("DELETE request to:",e);try{const t=await fetch(e,{method:"DELETE"}),r=await t.json();return console.log("DELETE response:",r),{data:r,status:t.status}}catch(t){throw console.error("DELETE error:",t),t}}}const i=new g;class b{constructor(){this.baseUrl="http://localhost:8000"}getTemplates(){return`${this.baseUrl}/bank-products`}getTemplatesWithSearch(e){return`${this.baseUrl}/bank-products?title=${encodeURIComponent(e)}`}getTemplateById(e){return`${this.baseUrl}/bank-products/${e}`}createTemplate(){return`${this.baseUrl}/bank-products`}updateTemplate(e){return`${this.baseUrl}/bank-products/${e}`}deleteTemplate(e){return`${this.baseUrl}/bank-products/${e}`}}const d=new b;class y{constructor(e,t){this.parent=e,this.onSearch=t}getHTML(){return`
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
        </div>`}addListeners(){const e=document.getElementById("searchInput"),t=document.getElementById("searchButton"),r=document.getElementById("clearSearch");t.addEventListener("mouseenter",()=>{t.style.backgroundColor="#1C1F24"}),t.addEventListener("mouseleave",()=>{t.style.backgroundColor="#2B2D33"}),r.addEventListener("mouseenter",()=>{r.style.backgroundColor="#D0C9C0"}),r.addEventListener("mouseleave",()=>{r.style.backgroundColor="#E9E4DD"}),t.addEventListener("click",()=>{this.onSearch(e.value.trim().toLowerCase())}),e.addEventListener("keypress",s=>{s.key==="Enter"&&this.onSearch(e.value.trim().toLowerCase())}),r.addEventListener("click",()=>{e.value="",this.onSearch("")})}render(){this.parent.insertAdjacentHTML("afterbegin",this.getHTML()),this.addListeners()}}class f{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("add-page")}getHTML(){return`
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

                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <textarea class="form-control" id="description" rows="3" required></textarea>
                </div>

                <div class="mb-3">
                    <label for="src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="src" required>
                </div>

                <button type="submit" class="btn btn-primary mt-4">Добавить карточку</button>
            </form>
        </div>
        `}clickBack(){new u(this.parent).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new l(e).render(this.clickBack.bind(this)),document.getElementById("add-form").addEventListener("submit",async s=>{s.preventDefault();const n={title:document.getElementById("title").value,description:document.getElementById("description").value,src:document.getElementById("src").value};try{const o=await i.post(d.createTemplate(),n);o.status===201?this.clickBack():console.error("Ошибка создания карточки:",o.status)}catch(o){console.error("Ошибка при создании карточки:",o)}})}}class v{constructor(e,t){this.parent=e,this.cardId=t,this.comments=""}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
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

                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <textarea class="form-control" id="description" rows="3" required></textarea>
                </div>

                <div class="mb-3">
                    <label for="src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="src" required>
                </div>

                <button type="submit" class="btn btn-primary mt-4">Сохранить изменения</button>
            </form>
        </div>
        `}clickBack(){new u(this.parent).render()}async loadCardData(){try{const e=await i.get(d.getTemplateById(this.cardId));e.status===200&&e.data?(document.getElementById("title").value=e.data.title,document.getElementById("description").value=e.data.description,document.getElementById("src").value=e.data.src,this.comments=e.data.comments||""):(console.error("Ошибка загрузки данных карточки:",e.status),this.clickBack())}catch(e){console.error("Ошибка при загрузке данных карточки:",e),this.clickBack()}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new l(e).render(this.clickBack.bind(this)),this.loadCardData(),document.getElementById("edit-form").addEventListener("submit",async s=>{s.preventDefault();const n={id:this.cardId,title:document.getElementById("title").value,description:document.getElementById("description").value,src:document.getElementById("src").value,comments:this.comments};try{const o=await i.put(d.updateTemplate(this.cardId),n);o.status===200?this.clickBack():console.error("Ошибка обновления карточки:",o.status)}catch(o){console.error("Ошибка при обновлении карточки:",o)}})}}class w{constructor(e,t){this.parent=e,this.cardId=t,this.data=null,this.saveMsgTimeout=null}get pageRoot(){return document.getElementById("view-page")}getHTML(){return this.data?`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>
        <div id="view-page" class="container mt-4">
            <div class="card mb-3" style="max-width: 500px; margin: 0 auto;">
                <img src="${this.data.src}" class="card-img-top" alt="${this.data.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${this.data.title}</h5>
                    <p class="card-text">${this.data.description}</p>
                    <p class="card-text"><small class="text-muted">ID: ${this.data.id}</small></p>
                </div>
            </div>
            <form id="comment-form" class="mt-4" style="max-width: 500px; margin: 0 auto;">
                <div class="mb-3">
                    <label for="comments" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="comments" value="${this.data.comments||""}" placeholder="Введите комментарий...">
                </div>
                <button type="submit" class="btn btn-primary">Сохранить комментарий</button>
                <div id="save-msg" style="margin-top:10px; color:green; display:none;">Комментарий сохранён!</div>
            </form>
        </div>
        `:"<div>Загрузка...</div>"}clickBack(){new u(this.parent).render()}async loadCardData(){try{const e=await i.get(d.getTemplateById(this.cardId));e.status===200&&e.data?(this.data=e.data,this.render()):(console.error("Ошибка загрузки данных карточки:",e.status),this.clickBack())}catch(e){console.error("Ошибка при загрузке данных карточки:",e),this.clickBack()}}async saveComment(e){e.preventDefault();const t=document.getElementById("comments").value,r={...this.data,comments:t};try{if((await i.put(d.updateTemplate(this.cardId),r)).status===200){this.data.comments=t;const n=document.getElementById("save-msg");n&&(n.style.display="block",clearTimeout(this.saveMsgTimeout),this.saveMsgTimeout=setTimeout(()=>{n.style.display="none"},2e3))}else this.showError("Ошибка при сохранении комментария!")}catch(s){console.error("Ошибка при сохранении комментария:",s),this.showError("Ошибка при сохранении комментария!")}}showError(e){const t=document.getElementById("save-msg");t&&(t.textContent=e,t.style.color="red",t.style.display="block",clearTimeout(this.saveMsgTimeout),this.saveMsgTimeout=setTimeout(()=>{t.style.display="none",t.textContent="Комментарий сохранён!",t.style.color="green"},2e3))}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");if(e&&new l(e).render(this.clickBack.bind(this)),!this.data){this.loadCardData();return}const t=document.getElementById("comment-form");t&&t.addEventListener("submit",this.saveComment.bind(this))}}class u{constructor(e){this.parent=e,this.data=[],this.handleSearch=this.handleSearch.bind(this)}async getData(){try{const e=await i.get(d.getTemplates());e.status===200&&e.data?(this.data=e.data,this.renderCards(this.data,!0)):(console.error("Ошибка получения данных:",e.status),this.data=[],this.renderCards(this.data,!0))}catch(e){console.error("Ошибка получения данных:",e),this.data=[],this.renderCards(this.data,!0)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        <!-- Добавляем контейнер для фильтра -->
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
        `}async handleSearch(e){try{if(e){const t=await i.get(d.getTemplatesWithSearch(e));t.status===200&&t.data?this.renderCards(t.data,!1):(console.error("Ошибка получения данных при поиске:",t.status),this.renderCards([],!1))}else await this.getData()}catch(t){console.error("Ошибка при поиске:",t),this.renderCards([],!1)}}renderCards(e,t){this.pageRoot.innerHTML="",e.forEach(r=>{new p(this.pageRoot).render(r,()=>this.handleViewCard(r.id),()=>this.handleEditCard(r.id),()=>this.handleRemoveCard(r.id))}),t&&new h(this.pageRoot).render(()=>this.handleAddCard())}handleViewCard(e){new w(this.parent,e).render()}handleEditCard(e){new v(this.parent,e).render()}handleAddCard(){new f(this.parent).render()}async handleRemoveCard(e){try{const t=await i.delete(d.deleteTemplate(e));t.status===200?(this.data=this.data.filter(r=>r.id!==e),this.renderCards(this.data,!0)):console.error("Ошибка удаления карточки:",t.status)}catch(t){console.error("Ошибка удаления карточки:",t)}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new l(e).render();const r=document.getElementById("search-filter-container");new y(r,this.handleSearch).render(),this.getData()}}const E=document.getElementById("root"),x=new u(E);x.render();
