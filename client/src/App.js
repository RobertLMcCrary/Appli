import React, { useState } from 'react'

function App() {
	const [reload, setReload] = useState(false)

	const refreshJobs = () => {
		setReload(!reload)
	}

	return (
		<div className="App">
			
		</div>
	);
}

export default App;
