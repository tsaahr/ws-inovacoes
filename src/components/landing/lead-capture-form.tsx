"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onlyDigits } from "@/lib/utils";

const modalityOptions = [
  "Automóvel",
  "Imobiliário",
  "Rural",
  "Procedimentos Corporais",
] as const;

const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => onlyDigits(value).length >= 10,
      "Informe um WhatsApp válido.",
    ),
  modality: z.enum(modalityOptions, {
    error: "Selecione a modalidade do crédito.",
  }),
  creditValue: z
    .string()
    .trim()
    .refine((value) => onlyDigits(value).length > 0, "Informe o valor do crédito."),
  installment: z
    .string()
    .trim()
    .refine((value) => onlyDigits(value).length > 0, "Informe a parcela ideal."),
  city: z.string().trim().min(2, "Informe sua cidade e estado."),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadCaptureForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      modality: undefined,
      creditValue: "",
      installment: "",
      city: "",
    },
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = form;

  async function onSubmit(values: LeadFormValues) {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.success) {
        toast.error(data?.error || "Não foi possível enviar seus dados.");
        return;
      }

      setIsSuccess(true);
    } catch {
      toast.error("Não foi possível enviar seus dados.");
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="border-brand-blue/40 bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-brand-dark">
              ✅ Recebemos seu contato!
            </CardTitle>
            <CardDescription className="text-base">
              Em breve nossa equipe entrará em contato.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Obrigado por confiar na WS Inovações para planejar seu crédito.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-lg border bg-card p-4 shadow-sm sm:p-5 md:p-6"
      noValidate
    >
      <FieldGroup className="grid gap-3.5 md:grid-cols-2 md:gap-4">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Seu nome completo"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
        </Field>

        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
        </Field>

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="phone">WhatsApp</FieldLabel>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(99) 99999-9999"
                maxLength={15}
                value={field.value || ""}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(maskPhone(event.target.value))}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? (
                <FieldError>{errors.phone.message}</FieldError>
              ) : null}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="modality"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.modality)}>
              <FieldLabel htmlFor="modality">Modalidade do crédito</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="modality"
                  aria-invalid={Boolean(errors.modality)}
                >
                  <SelectValue placeholder="Selecione uma modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {modalityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.modality ? (
                <FieldError>{errors.modality.message}</FieldError>
              ) : null}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="creditValue"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.creditValue)}>
              <FieldLabel htmlFor="creditValue">Valor do crédito</FieldLabel>
              <Input
                id="creditValue"
                inputMode="numeric"
                placeholder="Ex: R$ 80.000"
                value={field.value || ""}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange(maskCurrency(event.target.value))
                }
                aria-invalid={Boolean(errors.creditValue)}
              />
              {errors.creditValue ? (
                <FieldError>{errors.creditValue.message}</FieldError>
              ) : null}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="installment"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.installment)}>
              <FieldLabel htmlFor="installment">Parcela ideal</FieldLabel>
              <Input
                id="installment"
                inputMode="numeric"
                placeholder="Ex: R$ 1.200"
                value={field.value || ""}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange(maskCurrency(event.target.value))
                }
                aria-invalid={Boolean(errors.installment)}
              />
              {errors.installment ? (
                <FieldError>{errors.installment.message}</FieldError>
              ) : null}
            </Field>
          )}
        />

        <Field data-invalid={Boolean(errors.city)} className="md:col-span-2">
          <FieldLabel htmlFor="city">Cidade/Estado</FieldLabel>
          <Input
            id="city"
            autoComplete="address-level2"
            placeholder="Ex: Rio Grande / RS"
            aria-invalid={Boolean(errors.city)}
            {...register("city")}
          />
          {errors.city ? <FieldError>{errors.city.message}</FieldError> : null}
        </Field>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-1 w-full md:col-span-2"
        >
          {isSubmitting ? (
            <Loader2Icon data-icon="inline-start" className="animate-spin" />
          ) : null}
          {isSubmitting ? "Enviando..." : "Receber contato"}
        </Button>
      </FieldGroup>
    </motion.form>
  );
}

function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  const ddd = digits.slice(0, 2);
  const firstPart = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
  const secondPart = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);

  if (digits.length <= 2) {
    return ddd ? `(${ddd}` : "";
  }

  if (!secondPart) {
    return `(${ddd}) ${firstPart}`;
  }

  return `(${ddd}) ${firstPart}-${secondPart}`;
}

function maskCurrency(value: string) {
  const digits = onlyDigits(value);

  if (!digits) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(digits));
}
