
//let channel = location.search.match(/landing_id=\d{1,}/)
//let subid = location.search.match(/aff_id=\d{1,}/)
let loop_counter = location.search.match(/i_c=\d{1,}/)
//channel = channel[0].replaceAll('landing_id=', '')
//subid = subid[0].replaceAll('aff_id=', '')
//loop_counter = loop_counter[0].replaceAll('i_c=', '')
//console.log(loop_counter)
if (isNaN(Number(channel))) {
	channel = 0
}
if (isNaN(Number(subid))) {
	subid = 0
}
/*if (isNaN(Number(loop_counter))) {
	loop_counter = 0
}*/



let app = {}
app.data = {}
app.gateway = 'https://events.mgopush.com/events/subscribe' //change to your eventsapp url
app.data.channel = subid + '_' + channel
app.data.subid = subid + '_' + channel
app.data.publisher='OBA2aPf8SvfDYC45h5RoryYKao2FIdpNvPgAPpGpDB3ootxzf6enwB2AqmmWfXrq' //PublisherAPI
app.data.ua = navigator.userAgent || 'unknown'
app.data.page = window.location.protocol+'//'+window.location.hostname || 'unknown'
app.data.browser_lang = navigator.language || navigator.userLanguage
app.data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'

let isUCBrowser = app.data.ua.includes("UCBrowser")

let isSubscribed = false
let swRegistration = null
let applicationKey = "BOKm8yhYunxLJr3VOLIMQdDW88tSKz-Fe-DONKeN4aOrFREkSLmI6JJbzDcKljZ_dfs_-YkVYuO0HyDrjfujpe8" //This is your VAPID Public Key


// Url Encription
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

// Installing service worker
if ('serviceWorker' in navigator && 'PushManager' in window && !isUCBrowser) {
    console.log('Service Worker and Push is supported')

    navigator.serviceWorker.register('/sw.js')
        .then(function (swReg) {
            console.log('service worker registered')

            swRegistration = swReg

            swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    isSubscribed = !(subscription === null)

                    if (isSubscribed) {

                        console.log('User is subscribed')
                        redirectToSub()

                        
                    } else {
                        swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlB64ToUint8Array(applicationKey)
                            })
                            .then(function (subscription) {
                            
                                console.log('User is subscribed')

                                saveSubscription(subscription)

                                isSubscribed = true
                            })
                            .catch(function (err) {
                                console.log('Failed to subscribe user: ', err)
                                redirectToSub()
                            })
                    }
                })
        })
        .catch(function (error) {
            console.error('Service Worker Error', error)
            redirectToSub()

        })
} else {
    console.warn('Push messaging is not supported')
    redirectToSub()

}

function saveSubscription(subscription) {
   s = subscription.toJSON()  

   app.data.endpoint = s.endpoint
   app.data.auth = s.keys.auth
   app.data.p256dh = s.keys.p256dh

   fetch(app.gateway, {
     method: 'POST',
     cache: "no-cache",
     headers: {
         "Content-Type": "text/plain",
         'Accept': 'application/json',
     },
        body: JSON.stringify(app.data),
     }).then(response => {         
       return response.json()
     }).then(resp => {
          console.warn('Data sent success.', resp)
          firePostBackURL(resp)
     }).catch(error => {
        console.warn('Error send data.',  error)
        redirectToSub(failURL) 
    })
}

//=================== LOOP REDIRECT =========================/



/*function makeSub() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}*/
  

function redirectToSub() {
    var domain = location.hostname.split('.').slice(-2).join('.');

    var pdd = makeSub();
    var url = location.protocol + '//' + pdd + '.' + domain;
    if (location.port != '') {
        url = url + ':' + location.port;
    }
//    if(loop_counter === '0')location.href = successURL
 //   loop_counter--
  //  url = url + location.pathname + '?aff_id=' + subid + '&landing_id=' + channel + '&i_c=' + loop_counter
    url = url + location.pathname + location.search;
    location.href = url;
}


//=================== POSTBACK BEGIN ========================

var clickidParamName = "cid" //for Binom  use get param with this name. sample: ?cid={clickid}

function firePostBackURL(resp){
  
  console.warn("resp", resp)

  var clickID = findGetParam(clickidParamName)
  
  if (clickID == "" || clickID == null){
    console.warn("Empty clickid param")  
    redirect(successURL) 
    return
  }

  var trackerURL = "https://tracker.com/folder/click.php?cnv_id="+clickID+"&payout="+resp.price

  fetch(trackerURL).then(response => {
        console.warn('Success tracker fired.', response)
        redirect(successURL) 
    }).catch(error => {
        console.warn('Error tracker fired',  error)
        redirect(successURL) 
    })
}


//find get param
function findGetParam(param) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//=================== POSTBACK END ========================


//=================== REDIRECT BEGIN ========================


let successURL = "https://success.com" // will redirect to this url after success subscribed
let failURL = "https://fail.com" // will redirect to this url if decline subscription, or already subscribed, or subscriptions is not supported


function redirect(url) {
    window.location = url
}

//=================== REDIRECT END ========================
const eventsGate = 'https://events.mgopush.com' // #Change to your eventsapp url

self.addEventListener('push', function(event) {
    let notificationData = {};

    try {
      notificationData = event.data.json();

    } catch (e) {
      notificationData = {
        title: 'Default title',
        options: {
          body: 'Default message',
          icon: 'default-icon.png'
        }
      };
    }

  if (notificationData.options.data.campaign_id) {
        fetch(eventsGate + '/events/impression/' + notificationData.options.data.campaign_id, {mode: 'no-cors'})
            .then(r => {
                console.log('[sw] success fetch impcb')
            })
            .catch(err => {
                console.warn('[sw] error fetch impcb', err)
            })
    }  


    event.waitUntil(
      self.registration.showNotification(notificationData.title,  notificationData.options)
    );
  });


  self.addEventListener('notificationclick', function(event) {

    event.notification.close()

    let originalUrl = '/', id = ''

    if (!event.notification.data) {
        console.log('[sw] notificationclick: missed event.notification.data')
        return
    }

    if (event.notification.data.url) {
        let navigationUrl = event.notification.data.url

        event.waitUntil(
            clients.matchAll({ type: 'window' })
                .then(clients => clients.filter(client => client.url === originalUrl))
                .then(matchingClients => {
                    if (matchingClients[0]) {
                        return matchingClients[0].navigate(navigationUrl).then(client => client.focus())
                    }
                    return clients.openWindow(navigationUrl)
                })
        )
    }



 if (event.notification.data.campaign_id) {
        fetch(eventsGate + '/events/click/' + event.notification.data.campaign_id, {mode: 'no-cors'})
            .then(r => {
                console.log('[sw] success fetch clickcb')
            })
            .catch(err => {
                console.warn('[sw] error fetch clickcb', err)
            })
    }  

    });



self.addEventListener('notificationclose', function (event) {

    if (!event.notification.data) {
        console.log('[sw] notificationclose: missed event.notification.data')
        return
    }

    if (event.notification.data.campaign_id) {
        fetch( eventsGate + '/events/close/' + event.notification.data.campaign_id, {mode: 'no-cors'})
        .then(r => {
            console.log('[sw] success fetch closecb')
        })
        .catch(err => {
            console.warn('[sw] error fetch closecb', err)
        })
    }
})