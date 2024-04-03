function closePopUp() {
    document.getElementById('fullScreenPopUp').style.display = 'none';
}

document.getElementById('bananaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        size: document.getElementById('size').value,
        weight: document.getElementById('weight').value,
        sweetness: document.getElementById('sweetness').value,
        softness: document.getElementById('softness').value,
        harvest_time: document.getElementById('harvestTime').value,
        ripeness: document.getElementById('ripeness').value,
        acidity: document.getElementById('acidity').value
    };

    try {
        const response = await fetch('/classify_banana', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        document.getElementById('result').innerText = `Prediction: ${data.prediction}`;

        // Display full-screen pop-up with animation based on prediction
        const fullScreenPopUp = document.getElementById('fullScreenPopUp');
        const popUpMessage = document.getElementById('popUpMessage');
        const fireworks = document.querySelectorAll('.firework');
        if (data.prediction === 'Good') {
            popUpMessage.innerText = 'Wow! It is a good banana';
            fireworks.forEach(firework => firework.style.backgroundColor = '#32CD32'); // Green color for fireworks
        } else {
            popUpMessage.innerText = 'Ohh! Sorry, it is a bad banana';
            fireworks.forEach(firework => firework.style.backgroundColor = '#FF6347'); // Red color for fireworks
        }

        fullScreenPopUp.style.display = 'block'; // Display full-screen pop-up
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred. Please try again.';
    }
});
