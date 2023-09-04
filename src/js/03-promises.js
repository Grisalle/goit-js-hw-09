import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
};

formEl.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayEl = Number(this.elements.delay.value);
  const stepEl = Number(this.elements.step.value);
  const amountEl = Number(this.elements.amount.value);

  for (let i = 0; i < amountEl; i++) {
    const promisePosition = i + 1;
    createPromise(promisePosition, delayEl + i * stepEl)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
