import { Route, Routes } from "react-router-dom";
import { LoginPage } from '../auth';
import { HulkStoreRoutes } from '../hulkstore';
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="login/*" element={
                    <PublicRouter>
                        <Routes>
                            <Route path="/*" element={<LoginPage />} />
                        </Routes>
                    </PublicRouter>
                } />

                <Route path="/*" element={
                    <PrivateRouter>
                        <HulkStoreRoutes />
                    </PrivateRouter>
                } />
            </Routes>
        </>
    )
}
