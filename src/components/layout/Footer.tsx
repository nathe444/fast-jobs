export function Footer() {
    return (
        <footer className="border-t border-border py-8 mt-auto">
            <div className="container-max text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Minimal Job Board. All rights reserved.</p>
            </div>
        </footer>
    );
}
