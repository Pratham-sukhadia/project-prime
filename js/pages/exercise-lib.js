/* ============================================================
   PROJECT PRIME — Exercise Library Page
   ============================================================ */
window.ExerciseLibPage = (() => {
  let filter = 'all';
  let searchQuery = '';

  function render() {
    const groups = ExerciseLibrary.getGroups();
    let exercises = filter === 'all' ? ExerciseLibrary.getAll() : ExerciseLibrary.getByGroup(filter);
    if (searchQuery) exercises = ExerciseLibrary.search(searchQuery);

    return `
      <div class="page" id="exercise-lib-page">
        <div class="page-header"><h1 class="page-title">Exercise Library</h1><p class="page-subtitle">${ExerciseLibrary.getAll().length} exercises</p></div>

        <div class="search-bar card-enter stagger-1">
          <span class="search-icon"><i data-lucide="search" style="width:18px;height:18px;"></i></span>
          <input type="text" placeholder="Search exercises..." value="${searchQuery}" oninput="ExerciseLibPage.onSearch(this.value)">
        </div>

        <div class="filter-chips card-enter stagger-2">
          <span class="chip ${filter === 'all' ? 'active' : ''}" onclick="ExerciseLibPage.setFilter('all')">All</span>
          ${groups.map(g => `<span class="chip ${g} ${filter === g ? 'active' : ''}" onclick="ExerciseLibPage.setFilter('${g}')">${g.charAt(0).toUpperCase() + g.slice(1)}</span>`).join('')}
        </div>

        <div id="exercise-list">
          ${exercises.map(ex => `
            <div class="lib-exercise-card" onclick="ExerciseLibPage.showDetail('${ex.id}')">
              <div class="lib-exercise-icon" style="background:var(--${getGroupBg(ex.group)});font-size:20px;">${getGroupEmoji(ex.group)}</div>
              <div class="lib-exercise-info">
                <div class="lib-exercise-name">${ex.name}</div>
                <div class="lib-exercise-muscles">
                  <span class="chip ${ex.group}" style="font-size:9px;padding:0 5px;">${ex.primary}</span>
                </div>
                <div class="lib-exercise-equipment">${ex.equipment} • ${ex.difficulty}</div>
              </div>
              <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-muted);flex-shrink:0;"></i>
            </div>
          `).join('')}
          ${exercises.length === 0 ? '<div class="empty-state"><div class="empty-state-title">No exercises found</div><p class="empty-state-text">Try a different search term</p></div>' : ''}
        </div>
      </div>
    `;
  }

  function getGroupEmoji(group) {
    return { chest: '🫁', back: '🔙', shoulders: '🏋️', arms: '💪', legs: '🦵', core: '🎯', cardio: '🏃' }[group] || '💪';
  }

  function getGroupBg(group) {
    return { chest: 'danger-bg', back: 'info-bg', shoulders: 'warning-bg', arms: 'accent-bg', legs: 'success-bg', core: 'danger-bg', cardio: 'info-bg' }[group] || 'accent-bg';
  }

  function showDetail(id) {
    const ex = ExerciseLibrary.getById(id);
    if (!ex) return;
    ModalComponent.open(ex.name, `
      <div class="flex gap-2 flex-wrap mb-4">
        <span class="chip ${ex.group}">${ex.primary}</span>
        ${ex.secondary ? `<span class="badge info">${ex.secondary}</span>` : ''}
        <span class="badge accent">${ex.equipment}</span>
        <span class="badge warning">${ex.difficulty}</span>
      </div>
      <h4 class="text-sm font-semibold mb-2">How to Perform</h4>
      <ol style="padding-left:20px;margin-bottom:16px;">
        ${ex.steps.map(s => `<li class="text-sm text-secondary mb-1">${s}</li>`).join('')}
      </ol>
      ${ex.mistakes ? `<h4 class="text-sm font-semibold mb-2" style="color:var(--danger);">Common Mistakes</h4><ul style="padding-left:20px;margin-bottom:16px;">${ex.mistakes.map(m => `<li class="text-sm text-secondary mb-1">${m}</li>`).join('')}</ul>` : ''}
      ${ex.alternatives ? `<h4 class="text-sm font-semibold mb-2">Alternatives</h4><div class="flex gap-2 flex-wrap">${ex.alternatives.map(a => `<span class="chip">${a}</span>`).join('')}</div>` : ''}
    `);
  }

  function setFilter(f) { filter = f; searchQuery = ''; Router.handleRoute(); }
  function onSearch(q) { searchQuery = q; filter = 'all'; Router.handleRoute(); }
  function init() {}
  return { render, init, setFilter, onSearch, showDetail };
})();
