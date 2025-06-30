import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Link to="/" className="hidden">
                Home
            </Link>
            <Outlet />
        </>
    );
}
