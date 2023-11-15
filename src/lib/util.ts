export   function debounce(func, timeout = 300){
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {func.apply(this, args) }, timeout) 
    };
  }

export function throttle (callback, limit) {
    var waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}

export function slugify(text: string){
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
}

export function formatDate(date: Date | string | null): string {

    if(!date){  return "" }
    if(typeof date === 'string'){
        date = new Date(date)
    }

    let currentTimeZoneOffset = date.getTimezoneOffset() * 60_000;
    date = new Date(date as any - currentTimeZoneOffset);
    

    const now = new Date()
    const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())

    const diffMs = utc2 - utc1
    const diffSec = diffMs / 1000
    const diffMin = diffSec / 60
    const diffHrs = diffMin / 60

    if (diffHrs < 24) {
        const hours = Math.floor(diffHrs)
        const minutes = Math.floor(diffMin % 60)

        let timeString = '';
        if (hours > 0) {
            timeString += `${hours} Stunde${hours > 1 ? 'n' : ''} `;
        }
        else if (minutes > 0) {
            timeString += `${minutes} Minute${minutes > 1 ? 'n' : ''} `;
        }
        else{
            timeString = "wenigen Sekunden"
        }
        return `vor ${timeString}`
    } else {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }
}