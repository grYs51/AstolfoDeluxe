import { AppBarStyle } from "../utils/styles";

export const AppBar = () => {
  return (
    <AppBarStyle>
      <h1 style={{ fontWeight: 'normal', fontSize: '20px'}}> Configuring</h1>
      <img
        src="https://docs.nestjs.kr/assets/logo-small.svg"
        alt="Nestjs"
        height={55}
        width={55}
        style={{
          borderRadius: "50px",
        }}
      />
    </AppBarStyle>
  );
};
