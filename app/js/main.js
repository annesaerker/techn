// Test command

// var buttonSidebarIsCollapsed = document.getElementById("btn-sidebar-is-collapsed");
// var sidebar = document.querySelector(".sidebar")
//
// var mainLogo = document.querySelector(".mainLogo");
// var sidebarMenuLink = document.querySelectorAll('.sidebar-menu-name');
// var iconClosed = document.getElementById('close');
//
//
// buttonSidebarIsCollapsed.addEventListener("click", function(){
//   console.log("X");
//   if(sidebar.classList.contains('sidebar-is-collapsed')){
//
//       sidebar.classList.remove('sidebar-is-collapsed')
//       mainLogo.classList.remove('mainLogo-is-collapsed')
//       iconClosed.classList.remove('buttonSidebar-is-collapsed')
//       for(var i = 0; i < sidebarMenuLink.length; i++){
//         sidebarMenuLink[i].classList.remove('sidebarMenuLink-is-collapsed')
//       }
//   }else{
//     sidebar.classList.add('sidebar-is-collapsed');
//     mainLogo.classList.add('mainLogo-is-collapsed');
//     iconClosed.classList.add('buttonSidebar-is-collapsed')
//     for(var i = 0; i < sidebarMenuLink.length; i++){
//       sidebarMenuLink[i].classList.add('sidebarMenuLink-is-collapsed')
//     }
//
//   }
//
// })

/* MOBILE  */

// btnSidebarMobile = document.getElementById("btnSidebarMobile");
// sidebarMobile = document.querySelector(".sidebarMobileContainer")
//
// btnSidebarMobile.addEventListener("click", function(){
//
//   console.log("X");
//   if(sidebarMobile.classList.contains('sidebarMobile-is-collapsed')){
//       sidebarMobile.classList.remove('sidebarMobile-is-collapsed')
//       btnSidebarMobile.classList.remove('burger-is-active')
//   }else{
//       sidebarMobile.classList.add('sidebarMobile-is-collapsed')
//       btnSidebarMobile.classList.add('burger-is-active')
//   }
//
// })





// var test = document.getElementById('test')
// (function () {
//   // test.addEventListener("click", function(){
//     // console.log("X")
//     // window.onload = function(){
//
//     // }
//     window.addEventListener('load',
//   function() {
//     alert('hello!');
//   }, false);
//     // window.onload = customerChoice();
//   // })
// }());
// window.addEventListener('load', function() {
//
//   var test = document.getElementById('test');
//
//   test.addEventListener("click", function(){
//     console.log("X");
//   });
//
// }, false);

// btnCloseEditUser = document.getElementById("btnCloseEditUser");
// editUser = document.getElementById("editUser");
//
//
// btnEditUser.addEventListener("click", function(){
//
//   editUser.classList.add('editUser-is-collapsed');
// });
//
// btnCloseEditUser.addEventListener("click", function(){
//
//   editUser.classList.remove('editUser-is-collapsed');
//   console.log("XX")
// });

// btnEditUser.addEventListener("click", function(){
//   console.log("ZZDWE")
//   if(btnCloseEditUser.classList.contains('editUser-is-collapsed')){
//
//       btnCloseEditUser.classList.remove('editUser-is-collapsed')
//       consolelog("ASAAA")
//
//   }else{
//     btnCloseEditUser.classList.add('editUser-is-collapsed');
//
//   }
// })










  /*******************   Carosel   ********************/

  $(".js-carousel").each(function(){
    var $carousel = $(this),
        $carouselContainer = $carousel.find(".js-carousel-container"),
        $carouselList = $carousel.find(".js-carousel-list"),
        $carouselItem = $carousel.find(".js-carousel-item"),
        $carouselButton = $carousel.find(".js-carousel-button"),
        setItemWidth = function(){
            $carouselList.removeAttr("style");
            var curWidth = $($carouselItem[0]).outerWidth() * $carouselItem.length;
            $carouselList.css("width", curWidth);
        },
        slide = function(){
            var $button = $(this),
                dir = $button.data("dir"),
                curPos = parseInt($carouselList.css("left")) || 0,
                moveto = 0,
                containerWidth = $carouselContainer.outerWidth(),
                listWidth = $carouselList.outerWidth(),
                before = (curPos + containerWidth),
                after = listWidth + (curPos - containerWidth);
            if(dir=="next"){
                moveto = (after < containerWidth) ? curPos - after : curPos - containerWidth;
            } else {
                moveto = (before >= 0) ? 0 : curPos + containerWidth;
            }


            $carouselList.animate({
                left: moveto
            });
        };
    $(window).resize(function(){
        setItemWidth();
    });
    setItemWidth();

    $carouselButton.on("click", slide);
});

/*******************   Half pie chart   ********************/

Chart.defaults.doughnutLabels = Chart.helpers.clone(Chart.defaults.doughnut);

var helpers = Chart.helpers;
var defaults = Chart.defaults;

Chart.controllers.doughnutLabels = Chart.controllers.doughnut.extend({
	updateElement: function(arc, index, reset) {
    var _this = this;
    var chart = _this.chart,
        chartArea = chart.chartArea,
        opts = chart.options,
        animationOpts = opts.animation,
        arcOpts = opts.elements.arc,
        centerX = (chartArea.left + chartArea.right) / 2,
        centerY = (chartArea.top + chartArea.bottom) / 2,
        startAngle = opts.rotation, // non reset case handled later
        endAngle = opts.rotation, // non reset case handled later
        dataset = _this.getDataset(),
        circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
        innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
        outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
        custom = arc.custom || {},
        valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

    helpers.extend(arc, {
      // Utility
      _datasetIndex: _this.index,
      _index: index,

      // Desired view properties
      _model: {
        x: centerX + chart.offsetX,
        y: centerY + chart.offsetY,
        startAngle: startAngle,
        endAngle: endAngle,
        circumference: circumference,
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
      },

      draw: function () {
      	var ctx = this._chart.ctx,
						vm = this._view,
						sA = vm.startAngle,
						eA = vm.endAngle,
						opts = this._chart.config.options;

					var labelPos = this.tooltipPosition();
					var segmentLabel = vm.circumference / opts.circumference * 100;

					ctx.beginPath();

					ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
					ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

					ctx.closePath();
					ctx.strokeStyle = vm.borderColor;
					ctx.lineWidth = vm.borderWidth;

					ctx.fillStyle = vm.backgroundColor;

					ctx.fill();
					ctx.lineJoin = 'bevel';

					if (vm.borderWidth) {
						ctx.stroke();
					}

					if (vm.circumference > 0.0015) { // Trying to hide label when it doesn't fit in segment
						ctx.beginPath();
						ctx.font = helpers.fontString(opts.defaultFontSize, opts.defaultFontStyle, opts.defaultFontFamily);
						ctx.fillStyle = "#fff";
						ctx.textBaseline = "top";
						ctx.textAlign = "center";

            // Round percentage in a way that it always adds up to 100%
						ctx.fillText(segmentLabel.toFixed(2) + "%", labelPos.x, labelPos.y);


          }
          //display in the center the total sum of all segments
        //   ctx.fillText('Total = ', vm.x, vm.y-20, 200);
      }
    });

    var model = arc._model;
    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
    model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
    model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
    model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

    // Set correct angles if not resetting
    if (!reset || !animationOpts.animateRotate) {
      if (index === 0) {
        model.startAngle = opts.rotation;
      } else {
        model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
      }

      model.endAngle = model.startAngle + model.circumference;
    }

    arc.pivot();
  }
});

var config = {
  type: 'doughnutLabels',
  data: {
    datasets: [{
      data: [
        53,
        53,
      ],
      backgroundColor: [
        "#3080FF",
        "#3AEBA9",
      ],
      label: 'Tickets'
    }],
    labels: [
      "Tickets sold = 53",
      "Tickets remaining = 53"
    ]
  },
  options: {
			circumference: Math.PI,
			rotation: 1.0 * Math.PI,
			responsive: true,
			legend: { position: 'top',},
			title: { display: false, text: 'Graphics' },
			animation: { animateScale: true, animateRotate: true }
		}
};

var ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, config);


/*******************   Tickets sold chart   ********************/

var ctx = document.getElementById("ticketsSold");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1:00 pm", "4:00 pm", "7:00 pm", "10:00 pm", "1:00 Am", "4:00 Am", "7:00 Am", "10:00 Am"],
        datasets: [{
            label: 'Tickets Sold',
            data: [0, 2, 4, 2, 5, 2, 1, 1, 1],
            backgroundColor: [
                'rgba(35, 132, 222, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderColor: [
                'rgba(35, 132, 222, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Income',
            data: [0, 3, 5, 3, 6, 3, 2, 2, 2],
            backgroundColor: [
                'rgba(72, 206, 189, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderColor: [
                'rgba(72, 206, 189, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderWidth: 1
        }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        }
    }
});


/*******************    Shares chart   ********************/

var ctx = document.getElementById("sharesChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
        datasets: [{
            label: 'Tickets Sold',
            data: [12, 0, 24, 0, 18, 0, 22, 0, 17, 0, 5, 0, 14, 0, 9, 0, 23, 0,12, 0, 24, 0, 18, 0, 22, 0, 17, 0, 5, 0, 14, 0, 9, 0, 23, 0],
            backgroundColor: [
                'rgba(35, 132, 222, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderColor: [
                'rgba(35, 132, 222, 1)',
                'rgba(72, 206, 189, 1)'
            ],
            borderWidth: 1
        },
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        }
    }
});
myChart.ctx.canvas.removeEventListener('wheel', myChart._wheelHandler);
