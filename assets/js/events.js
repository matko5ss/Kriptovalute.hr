/**
 * Kriptovalute.hr - Eventi stranica logika
 */
(function() {
  'use strict';

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  function parseDate(str) {
    var parts = str.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function formatDateHR(dateStr) {
    var d = parseDate(dateStr);
    var months = ['siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenoga', 'prosinca'];
    return d.getDate() + '. ' + months[d.getMonth()] + ' ' + d.getFullYear() + '.';
  }

  function formatDateRange(startStr, endStr) {
    if (startStr === endStr) return formatDateHR(startStr);
    return formatDateHR(startStr) + ' – ' + formatDateHR(endStr);
  }

  function isUpcoming(event) {
    var endDate = parseDate(event.endDate);
    return endDate >= today;
  }

  function getCountdown(endStr) {
    var end = parseDate(endStr);
    end.setHours(23, 59, 59, 999);
    var now = new Date();
    if (end <= now) return null;
    var diff = end - now;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);
    return { days: days, hours: hours, mins: mins, secs: secs };
  }

  function renderCountdown(countdown, el) {
    if (!countdown) return;
    var html = '<div class="kripto-countdown-item"><span class="num">' + countdown.days + '</span><span class="label">dana</span></div>';
    html += '<div class="kripto-countdown-item"><span class="num">' + String(countdown.hours).padStart(2, '0') + '</span><span class="label">sati</span></div>';
    html += '<div class="kripto-countdown-item"><span class="num">' + String(countdown.mins).padStart(2, '0') + '</span><span class="label">min</span></div>';
    html += '<div class="kripto-countdown-item"><span class="num">' + String(countdown.secs).padStart(2, '0') + '</span><span class="label">sek</span></div>';
    el.innerHTML = html;
  }

  function updateCountdowns() {
    document.querySelectorAll('.kripto-event-countdown[data-end]').forEach(function(el) {
      var endStr = el.getAttribute('data-end');
      var countdown = getCountdown(endStr);
      if (countdown) {
        renderCountdown(countdown, el);
      }
    });
  }

  function renderEventCard(event, isUpcomingEv) {
    var categories = Array.isArray(event.category) ? event.category.join(', ') : (event.category || '');
    var cardClass = 'kripto-event-card' + (event.featured ? ' featured' : '');
    var countdownHtml = '';
    if (isUpcomingEv) {
      var cd = getCountdown(event.endDate);
      if (cd) {
        countdownHtml = '<div class="kripto-event-countdown" data-end="' + event.endDate + '"></div>';
      }
    } else {
      countdownHtml = '<div class="kripto-event-past-date"><i class="fa fa-calendar"></i> ' + formatDateRange(event.startDate, event.endDate) + '</div>';
    }

    var img = event.image || 'https://via.placeholder.com/400x250/0a0d42/ffffff?text=Event';
    var imgError = "this.onerror=null;this.src='https://via.placeholder.com/400x250/0a0d42/ffffff?text=Event';";

    return '<div class="' + cardClass + '">' +
      '<img class="kripto-event-card-image" src="' + img + '" alt="' + (event.title || '').replace(/"/g, '&quot;') + '" loading="lazy" onerror="' + imgError + '">' +
      '<div class="kripto-event-card-body">' +
        (event.featured ? '<span class="kripto-event-card-badge">Istaknuto</span>' : '') +
        '<div class="kripto-event-card-meta">' +
          '<span><i class="fa fa-map-marker"></i> ' + (event.location || '') + '</span>' +
          (categories ? '<span><i class="fa fa-tag"></i> ' + categories + '</span>' : '') +
        '</div>' +
        countdownHtml +
        '<h3><a href="' + (event.url || '#') + '" target="_blank" rel="noopener">' + (event.title || 'Event') + '</a></h3>' +
        '<p>' + (event.shortDescription || '') + '</p>' +
        '<a href="' + (event.url || '#') + '" target="_blank" rel="noopener" class="kripto-event-cta">Posjeti stranicu <i class="fa fa-external-link"></i></a>' +
      '</div>' +
    '</div>';
  }

  function filterEvents(events, filters) {
    return events.filter(function(ev) {
      if (filters.category && ev.category && ev.category.indexOf(filters.category) === -1) return false;
      if (filters.location && ev.location && ev.location.toLowerCase().indexOf(filters.location.toLowerCase()) === -1) return false;
      if (filters.featured && !ev.featured) return false;
      return true;
    });
  }

  function renderEvents(container, events, isUpcoming) {
    if (!events || events.length === 0) {
      container.innerHTML = '<div class="kripto-eventi-empty">' +
        '<i class="fa fa-calendar-o"></i>' +
        '<h3>' + (isUpcoming ? 'Nema nadolazećih eventa' : 'Nema prošlih eventa') + '</h3>' +
        '<p>Pokušajte promijeniti filtere ili pogledajte drugu kategoriju.</p>' +
        '</div>';
      return;
    }
    container.innerHTML = events.map(function(ev) {
      return renderEventCard(ev, isUpcoming);
    }).join('');
    if (isUpcoming) {
      container.querySelectorAll('.kripto-event-countdown[data-end]').forEach(function(el) {
        var endStr = el.getAttribute('data-end');
        renderCountdown(getCountdown(endStr), el);
      });
    }
  }

  function init() {
    if (typeof KRIPTO_EVENTS === 'undefined') return;

    var upcoming = KRIPTO_EVENTS.filter(isUpcoming).sort(function(a, b) {
      return parseDate(a.startDate) - parseDate(b.startDate);
    });
    var past = KRIPTO_EVENTS.filter(function(e) { return !isUpcoming(e); }).sort(function(a, b) {
      return parseDate(b.endDate) - parseDate(a.endDate);
    });

    var containerUpcoming = document.getElementById('kripto-events-upcoming');
    var containerPast = document.getElementById('kripto-events-past');
    var tabUpcoming = document.getElementById('tab-upcoming');
    var tabPast = document.getElementById('tab-past');
    var filterCategory = document.getElementById('filter-category');
    var filterLocation = document.getElementById('filter-location');
    var filterFeatured = document.getElementById('filter-featured');
    var btnReset = document.getElementById('filter-reset');

    var state = { category: '', location: '', featured: false, activeTab: 'upcoming' };

    function applyFilters() {
      state.category = filterCategory ? filterCategory.value : '';
      state.location = filterLocation ? filterLocation.value : '';
      state.featured = filterFeatured ? filterFeatured.checked : false;

      var filteredUpcoming = filterEvents(upcoming, state);
      var filteredPast = filterEvents(past, state);

      renderEvents(containerUpcoming, filteredUpcoming, true);
      renderEvents(containerPast, filteredPast, false);

      if (state.activeTab === 'upcoming') {
        containerUpcoming.style.display = 'grid';
        containerPast.style.display = 'none';
      } else {
        containerUpcoming.style.display = 'none';
        containerPast.style.display = 'grid';
      }

      if (state.activeTab === 'upcoming') {
        setTimeout(updateCountdowns, 0);
      }
    }

    if (tabUpcoming) {
      tabUpcoming.addEventListener('click', function() {
        state.activeTab = 'upcoming';
        tabUpcoming.classList.add('active');
        if (tabPast) tabPast.classList.remove('active');
        containerUpcoming.style.display = 'grid';
        containerPast.style.display = 'none';
        setTimeout(updateCountdowns, 0);
      });
    }
    if (tabPast) {
      tabPast.addEventListener('click', function() {
        state.activeTab = 'past';
        tabPast.classList.add('active');
        if (tabUpcoming) tabUpcoming.classList.remove('active');
        containerUpcoming.style.display = 'none';
        containerPast.style.display = 'grid';
      });
    }

    if (filterCategory) filterCategory.addEventListener('change', applyFilters);
    if (filterLocation) filterLocation.addEventListener('input', function() {
      clearTimeout(window._filterTimeout);
      window._filterTimeout = setTimeout(applyFilters, 300);
    });
    if (filterFeatured) filterFeatured.addEventListener('change', applyFilters);
    if (btnReset) {
      btnReset.addEventListener('click', function() {
        if (filterCategory) filterCategory.value = '';
        if (filterLocation) filterLocation.value = '';
        if (filterFeatured) filterFeatured.checked = false;
        state = { category: '', location: '', featured: false, activeTab: state.activeTab };
        applyFilters();
      });
    }

    applyFilters();

    setInterval(updateCountdowns, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
