import './App.css'

function TutorPanel() {
  return (
    <div className="w-[35%] h-full bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold text-gray-700">Tutor</h2>
    </div>
  )
}

function ManipulativePanel() {
  return (
    <div className="w-[65%] h-full bg-gray-50 p-4">
      <h2 className="text-xl font-bold text-gray-700">Workspace</h2>
    </div>
  )
}

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <TutorPanel />
      <ManipulativePanel />
    </div>
  )
}

export default App