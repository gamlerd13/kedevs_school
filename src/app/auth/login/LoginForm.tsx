"use client";
import { useState, FormEvent } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/Button";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const [errorCredentials, setErrorCredentials] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) {
      setErrorCredentials("Los campos no deben estar vacíos");
      return;
    }

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      setInputName("");
      setInputPassword("");
      setErrorCredentials("Usuario o contraseña incorrecta !");
    } else {
      setErrorCredentials(null);
      router.push("/");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="username"
          label="Nombre de usuario"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Admin"
        />
        <Input
          type="password"
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          label="Contraseña"
          placeholder="****"
        />
        {errorCredentials && (
          <div>
            <span className="text-sm text-rose-700">{errorCredentials}</span>
          </div>
        )}

        <ButtonSubmit text="Ingresar" />
      </div>
    </form>
  );
}
