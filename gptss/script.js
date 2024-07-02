const executeScript = async (script) => {
    try {
        const response = await fetch('http://localhost:3000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script }),
        });

        if (!response.ok) {
            throw new Error('Failed to execute script');
        }

        const result = await response.text();
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error executing script:', error);
    }
};

// Example usage:
const scriptToExecute = `print("Hello from server!")`;
executeScript(scriptToExecute);
