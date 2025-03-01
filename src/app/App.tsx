import classNames from "shared/library/classNames/classNames"
import { AppRouter } from "./providers/router"
import { useTheme } from "./providers/ThemeProvider"
import { Suspense } from "react"
import { RootStoreContext } from "./providers/StoreProvider"
import { RootStore } from "shared/store/root-store"
import { Navbar } from "widgets/NavbarNotReg"

function App() {
  const { theme } = useTheme()

  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <div className={classNames('app', {}, [theme])}>
        <Suspense fallback="" >
          <Navbar />
          <AppRouter />
        </Suspense>
      </div>
    </RootStoreContext.Provider>
  )
}

export default App
