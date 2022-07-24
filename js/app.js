fetch('../data.json')
      .then(response => response.json())
      .then(data => {
            const dailyLink = document.getElementById('daily');
            const weeklyLink = document.getElementById('weekly');
            const monthlyLink = document.getElementById('monthly');
            let dataToPrint = [];
            let frequency = '';
            let frequencyKeyWord = '';

            const updateTime = (keyword, current, previous) => {
                  const allTimeSpentCurrent = document.querySelectorAll('.time-spent-current');
                  const allTimeSpentPrevious = document.querySelectorAll('.time-spent-previous');
                  allTimeSpentCurrent.forEach(item => {
                        let type = item.parentElement.previousElementSibling.childNodes[1].textContent;
                        if (type === keyword) {
                              item.textContent = `${current}hrs`;
                        }
                  })
                  allTimeSpentPrevious.forEach(item => {
                        let type = item.parentElement.previousElementSibling.childNodes[1].textContent;
                        if (type === keyword) {
                              item.textContent = `Last ${frequencyKeyWord} - ${previous}hrs`;
                        }
                  })
            }

            const computeDisplayData = () => {
                  data.forEach(item => {
                        let object = {};
                        object["title"] = item.title;
                        object["data"] = item.timeframes[frequency];
                        console.log(object["data"]);
                        dataToPrint.push(object);
                  })
                  dataToPrint.forEach(item => {
                        console.log(item)
                        updateTime(item.title, item.data.current, item.data.previous);
                  })
            }

            const clearFrequencyClass = () => {
                  dailyLink.classList = '';
                  weeklyLink.classList = '';
                  monthlyLink.classList = '';
            }

            const showDailyData = () => {
                  frequency = 'daily';
                  frequencyKeyWord = 'day';
                  clearFrequencyClass();
                  dailyLink.classList.add('selected');
                  computeDisplayData();
            }

            const showWeeklyData = () => {
                  frequency = 'weekly';
                  frequencyKeyWord = 'week';
                  clearFrequencyClass();
                  weeklyLink.classList.add('selected');
                  computeDisplayData();
            }

            const showMonthlyData = () => {
                  frequency = 'monthly';
                  frequencyKeyWord = 'month';
                  clearFrequencyClass();
                  monthlyLink.classList.add('selected');
                  computeDisplayData();
            }

            dailyLink.addEventListener('click', showDailyData);
            weeklyLink.addEventListener('click', showWeeklyData);
            monthlyLink.addEventListener('click', showMonthlyData);
      });
