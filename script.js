document.addEventListener('DOMContentLoaded', function() {
    fetch('./config.json') // Assurez-vous que le chemin d'accès à config.json est correct
        .then(response => response.json())
        .then(config => {
            const resetPassEndpoint = config.RESET_PASS_ENDPOINT;

            document.getElementById('resetBtn').addEventListener('click', function(event) {
                event.preventDefault(); 

                const newPassword = document.getElementById('newPassword').value;
                const repeatPassword = document.getElementById('repeatPassword').value;

                if(newPassword !== repeatPassword) {
                    alert("The passwords do not match. Please try again.");
                    return;
                }

                const body = {
                    newPassword: newPassword,
                    repeatPassword: repeatPassword
                };

                fetch(resetPassEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.code == "invalid_input") {
                        alert(data.message);
                        return;
                    } else if (data.code == "password_mismatch") {
                        alert(data.message);
                        return;
                    } else if (data.code == "success") {
                        alert(data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("There was an error resetting your password. Please try again.");
                });

                document.getElementById('resetPasswordForm').reset();
            });
        })
        .catch(error => console.error('Error loading config:', error));
});
