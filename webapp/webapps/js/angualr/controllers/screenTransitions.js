var mainApp = angular.module('mainPage',[
    'ngRoute'
]);


mainApp.directive('draggable', function() {
    return {
        scope: {
            drop: '&',
            bin: '='
        },
        link:function(scope, element) {
            var el = element[0];
            el.draggable = true;
            el.addEventListener('dragstart',function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                return false;
            },false);
            
            el.addEventListener('dragend', function(e) {
                return false;
            },false);
    
            el.addEventListener('touchstart',function(e) {
                var touch = event.targetTouches[0];
                let wrapper = document.getElementById("personDiv");
                wrapper.appendChild(draggable);

                if(scope.old_target){
                    draggable.style.left = scope.old_target.style.left - touch.pageX-50 + 'px';
                    draggable.style.top = scope.old_target.style.top - touch.pageY-20 + 'px';
                    scope.old_target.appendChild(draggable);
                }
                else{            
                    draggable.style.left = touch.pageX-50 + 'px';
                    draggable.style.top = touch.pageY-20 + 'px';
                }
                return false;
            },false);
    
            el.addEventListener('touchmove',function(e) {
                let wrapper = document.getElementById("personDiv");
                draggable = document.getElementById('person');
                var touch = event.targetTouches[0];
                draggable.classList.add("person_fixed");
                if(scope.old_target){
                    draggable.style.left = scope.old_target.style.left - touch.pageX-50 + 'px';
                    draggable.style.top = scope.old_target.style.top - touch.pageY-20 + 'px';
                    wrapper.appendChild(draggable);
                }
                
                // Place element where the finger is
                draggable.style.left = touch.pageX-50 + 'px';
                draggable.style.top = touch.pageY-20 + 'px';
                e.preventDefault();
            },false);
            
            el.addEventListener('touchend',function(e) {
                let endTarget = document.elementFromPoint(
                    e.changedTouches[0].pageX + 15,
                    e.changedTouches[0].pageY + 15
                );
        
                draggable = document.getElementById('person');
                draggable.classList.remove("person_fixed");
              
                if(endTarget.alt == 'bin') {
                    endTarget.parentElement.appendChild(draggable);
                    scope.old_target = endTarget.parentElement;

                    // call the passed drop function
                    scope.$apply(function(scope) {
                        var fn = scope.drop();
                        if ('undefined' !== typeof fn) {            
                            fn(endTarget.id);
                        }
                    });
                }
                else{
                    if(scope.old_target){
                        scope.old_target.appendChild(draggable);
                    }
                }
                e.preventDefault();
                return false;
            },false);
        }
    }

    
});
mainApp.directive('droppable', function() {
    return {
        scope: {
            drop: '&',
            bin: '='
        },
        link: function(scope, element) {
            var el = element[0];
            el.addEventListener('dragover',function(e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault) e.preventDefault();
                return false;
                },false);
            
            el.addEventListener('dragenter',function(e) {
                return false;
                },false);
            
            el.addEventListener('dragleave',function(e) {
                return false;
                }, false);
            
            el.addEventListener('drop', function(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                
                var binId = this.id;
                var item = document.getElementById('person');
                e.target.parentElement.appendChild(item);
                
                // call the passed drop function
                scope.$apply(function(scope) {
                    var fn = scope.drop();
                    if ('undefined' !== typeof fn) {            
                        fn(binId);
                    }
                });
                return false;
                },
                false
            );
          
        }
    }
});

mainApp.controller('mainCtrl',function($scope,$window){
    draggable = document.getElementById('person');
    let flag = true;
    let openDashboardFlag = true;
    var bin_id;
    var cleaned_bin;
    var cleaned_bin_status;
    $scope.tooltips = [
            {
                id : 1,
                name : "bin1",
                value : 18,
                last_service:moment().subtract(10,'minutes').format('HH:mm:ss'),
                next_service:moment().add(110,'minutes').format('HH:mm:ss')
            },{
                id : 2,
                name : "bin2",
                value : 25,
                last_service:moment().subtract(20,'minutes').format('HH:mm:ss'),
                next_service:moment().add(100,'minutes').format('HH:mm:ss')
            },{
                id : 3,
                name : "bin3",
                value : 37,
                last_service:moment().subtract(40,'minutes').format('HH:mm:ss'),
                next_service:moment().add(80,'minutes').format('HH:mm:ss')
            },{
                id : 4,
                name : "bin4",
                value : 45,
                last_service:moment().subtract(50,'minutes').format('HH:mm:ss'),
                next_service:moment().add(70,'minutes').format('HH:mm:ss')
            },{
                id : 5,
                name : "bin5",
                value : 67,
                last_service:moment().subtract(80,'minutes').format('HH:mm:ss'),
                next_service:moment().add(40,'minutes').format('HH:mm:ss')
            },{
                id : 6,
                name : "bin6",
                value : 72,
                last_service:moment().subtract(90,'minutes').format('HH:mm:ss'),
                next_service:moment().add(30,'minutes').format('HH:mm:ss')
            },{
                id : 7,
                name : "bin7",
                value : 51,
                last_service:moment().subtract(60,'minutes').format('HH:mm:ss'),
                next_service:moment().add(60,'minutes').format('HH:mm:ss')
            },{
                id : 8,
                name : "bin8",
                value : 53,
                last_service:moment().subtract(70,'minutes').format('HH:mm:ss'),
                next_service:moment().add(50,'minutes').format('HH:mm:ss')
            },{
                id : 9,
                name : "bin9",
                value : 72,
                last_service:moment().subtract(100,'minutes').format('HH:mm:ss'),
                next_service:moment().add(20,'minutes').format('HH:mm:ss')
            },{
                id : 10,
                name : "bin10",
                value : 29,
                last_service:moment().subtract(30,'minutes').format('HH:mm:ss'),
                next_service:moment().add(90,'minutes').format('HH:mm:ss')
            },{
                id : 11,
                name : "bin11",
                value : 74,
                last_service:moment().subtract(110,'minutes').format('HH:mm:ss'),
                next_service:moment().add(10,'minutes').format('HH:mm:ss')
            }];

    function showAllLevels() {
        const $tooltip = $('[data-toggle="tooltip"]');
        $tooltip.tooltip({
            html: true,
            trigger: 'click',
            placement: 'bottom',
        });
        $tooltip.tooltip().tooltip('show');
        $('.level-btn').toggleClass('levelActive');
        $('.level-btn').text("Hide All Levels");
        let allTooltips =  $('.tooltip-inner');
        allTooltips.map((index) => {
            changeColor(allTooltips[index])
        });
    }

    $( document ).ready(function() {
        $('#6').click();
        flag = true;
        showAllLevels();
    });

    $scope.cleaned_bin_tooltips = [];
    $scope.cleaned_bin_time_log = [];

    /* initialize the modal */
    $('#checkSanitation').modal({
        backdrop:'static',
        keyboard:false
    })

    /* initialize the chart */
    current_level_Chart = new Chart('current_level',{
        type: 'doughnut',
        data: {
            datasets: [{
                data: [],
                backgroundColor:[/* 'rgb(102, 205, 170)','rgba(102, 205, 170,0.3)' */],
                
            }],
            labels: [],
        },
        options:{
            cutoutPercentage: 62,
            tooltips: {
                enabled:false,
                callbacks: {
                    label: function(tooltipItem, data) {
                    let label = data.labels[tooltipItem.index];
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return [label + ' : ' +  value + '%'];
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0
                },
                center: {
                    text: ' ',
                    color: ' ',
                    fontStyle: 'qualcommMedium', 
                    sidePadding: 20
                    }
                },
            legend:{
                display:true,
                position:'right'
            },
        }
    });

    service_teams_Chart = new Chart('service_teams',{
        type: 'doughnut',
        data: {
            datasets: [{
                data: [65,45],
                backgroundColor:['rgb(33, 90, 255)','rgba(33, 90, 255,0.3)'],
                
            }],
            labels: [],
        },
        options:{
            cutoutPercentage: 62,
            tooltips: {
                enabled : false,
                callbacks: {
                    label: function(tooltipItem, data) {
                    let label = data.labels[tooltipItem.index];
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return [label + ' : ' +  value + '%'];
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0
                },
                center: {
                    text: '65%',
                    color: 'rgb(33, 90, 255)',
                    fontStyle: 'qualcommMedium', 
                    sidePadding: 20 
                    }
                },
        
            legend:{
                display:true,
                position:'right',
            },
        }
    })

    /* hide the buttons */
    $('.deploy-btn').hide();
    $('.level-btn').hide();
    
    /* show buttons on close of modal */
    $('#checkSanitation').on('hidden.bs.modal', function (evt) {
        $('.deploy-btn').show();
        $('.level-btn').show();
        $('.bin_img').on('dragstart', function(event) { event.preventDefault(); });
        const $tooltip = $('[data-toggle="tooltip"]');
        $tooltip.tooltip({
            html: true,
            trigger: 'click',
            placement: 'bottom',
        });
    })

   
    $scope.openDashboard = function(evt){
        bin_id = evt.target.id;
        let openDashboardFlag = true;
        $scope.last_service =  $scope.tooltips.find(ele=>ele.id == bin_id).last_service; 
        $scope.next_service = $scope.tooltips.find(ele=>ele.id == bin_id).next_service
        cleaned_current_chart = $scope.cleaned_bin_tooltips.find(ele=>ele.id == bin_id);
        
        if(flag == true && openDashboardFlag ){
            $('.level-btn').toggleClass('levelActive');
            $('.level-btn').text("Show All Levels");
            flag = false;
            openDashboardFlag = false;
        }
     
        var current_chart_value;

        /* initialize the tooltip */
        const $tooltip = $('[data-toggle="tooltip"]');
        $tooltip.tooltip({
            html: true,
            trigger: 'click',
            placement: 'bottom',
        });
        $tooltip.tooltip('hide');
        $(evt.target).tooltip('show');

        $tooltip.css('transform', '');
        $(evt.target).css('transform', 'scale(1.5)');

        /* color for the tooltip text */
        let allTooltips =  $('.tooltip-inner');
        allTooltips.map((index) => {
            changeColor(allTooltips[index]);
        });
        
        $('#sidenav').addClass("active");

        
        /* update the chart */
        current_chart_value = $scope.tooltips.find(ele => ele.id == bin_id ).value;
        last_current_service = $scope.cleaned_bin_tooltips.find(ele=>ele.id == bin_id);
        if(Number(current_chart_value) > 50 ){
            if(cleaned_current_chart != undefined){
                $scope.last_service = last_current_service.last_service;
                $scope.next_service = last_current_service.next_service;
                current_level_Chart.options.elements.center.color = 'mediumaquamarine';
                current_level_Chart.data.datasets.map((dataset) => {
                    dataset.backgroundColor = [];
                    dataset.data = [];
                    dataset.backgroundColor.push('rgb(102, 205, 170)');
                    dataset.data.push(0);
                    dataset.backgroundColor.push('rgba(102, 205, 170,0.3)');
                    dataset.data.push(100);
                });
                current_level_Chart.options.elements.center.text = '0%';
                current_level_Chart.update();
            }
            else{
                cleaned_current_chart = $scope.cleaned_bin_tooltips.find(ele=>ele.id == bin_id);
                current_level_Chart.options.elements.center.color = 'red';
                current_level_Chart.data.datasets.map((dataset) => {
                    dataset.backgroundColor = [];
                    dataset.data = [];
                    dataset.backgroundColor.push('rgb(255, 26, 26)');
                    dataset.data.push(Number(current_chart_value));
                    dataset.backgroundColor.push('rgba(255, 26, 26,0.1)');
                    dataset.data.push(100-Number(current_chart_value));
                });
                current_level_Chart.options.elements.center.text = current_chart_value + '%';
                current_level_Chart.update();
            }
        }
        else{
            cleaned_current_chart = $scope.cleaned_bin_tooltips.find(ele=>ele.id == bin_id);
            if(cleaned_current_chart != undefined){
                $scope.last_service = last_current_service.last_service;
                $scope.next_service = last_current_service.next_service;
                current_level_Chart.options.elements.center.color = 'mediumaquamarine';
                current_level_Chart.data.datasets.map((dataset) => {
                    dataset.backgroundColor = [];
                    dataset.data = [];
                    dataset.backgroundColor.push('rgb(102, 205, 170)');
                    dataset.data.push(0);
                    dataset.backgroundColor.push('rgba(102, 205, 170,0.3)');
                    dataset.data.push(100);
                });
                current_level_Chart.options.elements.center.text = '0%';
                current_level_Chart.update();
            }
            else{
                current_level_Chart.options.elements.center.color = 'mediumaquamarine';
                current_level_Chart.data.datasets.map((dataset) => {
                    dataset.backgroundColor = [];
                    dataset.data = [];
                    dataset.data.push(Number(current_chart_value));
                    dataset.backgroundColor.push('rgb(102, 205, 170)');
                    dataset.data.push(100-Number(current_chart_value));
                    dataset.backgroundColor.push('rgba(102, 205, 170,0.3)');
                });
                current_level_Chart.options.elements.center.text = current_chart_value + '%';
                current_level_Chart.update();
            }
        }
       
    }

     /* return function after dropping */
    $scope.handleDrop = function(bin) {
        cleaned_bin = bin;
        cleaned_bin_status = true;
        $scope.cleaned_bin_tooltips.push({id:bin,last_service:moment().format('HH:mm:ss'),next_service:moment().add(2,'hours').format('HH:mm:ss')});

        var tooltip_id = document.getElementById(bin).getAttribute("aria-describedby");
        last_current_service = $scope.cleaned_bin_tooltips.find(ele=>ele.id == bin);
        $scope.last_service = last_current_service.last_service;
        $scope.next_service = last_current_service.next_service;
        if(tooltip_id == null){
            const $tooltip = $('[data-toggle="tooltip"]');
            $tooltip.tooltip({
                html: true,
                trigger: 'click',
                placement: 'bottom',
            });
            var tooltip_value = $('#'+tooltip_id).innerHTML;
            $('#'+bin).tooltip('show');
            $('#'+bin).tooltip()[0].dataset.originalTitle = '0%';
            $('#'+bin).tooltip('show');
            var tooltipId;
            if(bin == 6){
                tooltipId = $('#'+bin).tooltip()[0].attributes[12].nodeValue;
            }else{
                tooltipId = $('#'+bin).tooltip()[0].attributes[11].nodeValue;
            }
            $('#'+tooltipId).children('.tooltip-inner').css("color","mediumaquamarine");

            setTimeout(() => {
                $('#binClearedAlert').modal({
                    backdrop:'static',
                    keyboard:false
                })
            }, 5000);
            setTimeout(()=>{
                $window.location.reload();
            },15000)
        }
        else{
            $scope.last_service = last_current_service.last_service;
            $scope.next_service = last_current_service.next_service;
            current_level_Chart.options.elements.center.text = '0%';
            document.getElementById(bin).setAttribute('data-original-title', '0%');

            $('#'+tooltip_id).children('.tooltip-inner').css("color","mediumaquamarine");
            $('#'+bin).tooltip('show');
            
            let allTooltips =  $('.tooltip-inner');
            allTooltips.map((index) => {
                changeColor(allTooltips[index]);
            });


            current_level_Chart.options.elements.center.color = 'mediumaquamarine';
            current_level_Chart.data.datasets.map((dataset) => {
                dataset.backgroundColor = [];
                dataset.data = [];
                dataset.backgroundColor.push('rgb(102, 205, 170)');
                dataset.data.push(0);
                dataset.backgroundColor.push('rgba(102, 205, 170,0.3)');
                dataset.data.push(100);
            });
            current_level_Chart.update();

            setTimeout(() => {
                $('#binClearedAlert').modal({
                    backdrop:'static',
                    keyboard:false
                })
            }, 5000);
            setTimeout(()=>{
                $window.location.reload();
            },15000)
        }
    }

    $scope.closeSidenav = function(){
        $('#sidenav').removeClass("active");
    }

    $scope.showAllLevelToggle = function(){
        
        const $tooltip = $('[data-toggle="tooltip"]');
        $tooltip.tooltip('toggle');
        $('#'+cleaned_bin).tooltip('show');
        $('#'+bin_id).tooltip('show');
        $('.level-btn').toggleClass('levelActive');
        if(flag == true){
            $('.level-btn').text("Show All Levels");
            flag = false;
        }
        else{
            $('.level-btn').text("Hide All Levels");
            flag = true
        }
        let allTooltips =  $('.tooltip-inner');
        allTooltips.map((index) => {
            changeColor(allTooltips[index])
        });
    }


    
    $scope.deployTeam = function(){
        $('#person').css('display','inline')
        $('.deploy-btn').addClass('deployActive');
    }

    function changeColor(ele) {
        if(parseInt(ele.innerHTML) > 50) {
            $(ele).addClass('red');
        } else {
            $(ele).addClass('green');
        }
    }
})
