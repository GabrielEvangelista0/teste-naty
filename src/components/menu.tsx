import Link from "next/link";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "../lib/mui";

export default function Menu() {
    return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h1" component='h1' fontSize='2rem' sx={{ flexGrow: 1 }}>
                    ola mundo
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color="inherit">
                        <Link href="/" passHref>
                            Cliente
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/" passHref>
                            Condutor
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/" passHref>
                            Deslocamento
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/" passHref>
                        Veiculo
                        </Link>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}