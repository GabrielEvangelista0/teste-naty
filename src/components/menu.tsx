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
                        <Link href="/condutor" passHref>
                            Condutor
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/deslocamento" passHref>
                            Deslocamento
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/veiculo" passHref>
                        Veiculo
                        </Link>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}