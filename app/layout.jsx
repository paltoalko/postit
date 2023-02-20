import "./globals.css";
import Nav from "./auth/Nav";
import { Montserrat } from "@next/font/google";
import QueryWrapper from "../app/auth/QueryWrapper";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head />
			<body className={`mx-4 md:mx-48 xl:mx-96 ${montserrat.variable} bg-gray-200`}>
				<QueryWrapper>
					<Nav />
					{children}
				</QueryWrapper>
			</body>
		</html>
	);
}
