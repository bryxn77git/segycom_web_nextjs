
import { Box, Divider, Grid, Typography, Container } from '@mui/material';
import { MainLayout } from '../../components/layouts';

const Terminos = () => {
  return (
    <MainLayout title='Términos y condiciones' pageDescription={'Términos y condiciones de la empresa Segycom de Chihuahua'} >
    
    <Container maxWidth='xl'  >

        <Box minHeight='calc(100vh - 200px)'>


            <Grid container sx={{ mb: 3 , bgcolor: '#F7F7F7', py: 5, px: { xs: 1, md: 3} }} >
                <Grid sx={{ mb: 3 }} item xs={12}>
                    <Typography variant='h5' fontWeight={600} color='#666666' >{'TÉRMINOS Y CONDICIONES'}</Typography>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 1, px: 3 }}>
                    <Grid item xs={12}>
                        <Typography>Última actualización: 30 de Marzo de 2023</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Lea estos términos y condiciones detenidamente antes de utilizar Nuestro Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Interpretación y Definiciones'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1' color='#000000'>Interpretación</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las
                            siguientes condiciones. Las siguientes definiciones tendrán el mismo significado
                            independientemente de que aparezcan en singular o en plural.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1' color='#000000'>Definiciones</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            A los efectos de estos Términos y Condiciones:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`• Afiliado significa una entidad que controla, es controlada o está bajo control
                            común con una parte, donde "control" significa la propiedad del 50% o más de
                            las acciones, participación accionaria u otros valores con derecho a voto para la
                            elección de directores u otra autoridad administrativa`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • País se refiere a: México
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`• La Compañía (referida como "la Compañía", "Nosotros", "Nos" o "Nuestro" en
                            este Acuerdo) se refiere a Segycom de Chihuahua,  C. Francisco Pimentel 6502, Lagos, 31100 Chihuahua, Chih.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • Dispositivo significa cualquier dispositivo que pueda acceder al Servicio, como
                            una computadora, un teléfono celular o una tableta digital.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • Servicio se refiere al sitio web.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                           {`• Los Términos y condiciones (también denominados "Términos") significan
                            estos Términos y condiciones que forman el acuerdo completo entre Usted y la
                            Compañía con respecto al uso del Servicio.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • El sitio web se refiere a Segycom de Chihuahua.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • Usted se refiere a la persona que accede o utiliza el Servicio, o la empresa u
                            otra entidad legal en nombre de la cual dicha persona accede o utiliza el
                            Servicio, según corresponda.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >Reconocimiento</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Estos son los Términos y Condiciones que rigen el uso de este Servicio y el acuerdo
                            que opera entre Usted y la Compañía. Estos Términos y Condiciones establecen los
                            derechos y obligaciones de todos los usuarios con respecto al uso del Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Su acceso y uso del Servicio está condicionado a Su aceptación y cumplimiento de
                            estos Términos y condiciones. Estos Términos y condiciones se aplican a todos los
                            visitantes, usuarios y otras personas que acceden o utilizan el Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos y
                            condiciones. Si no está de acuerdo con alguna parte de estos Términos y condiciones,
                            no podrá acceder al Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Usted declara que es mayor de 18 años. La Compañía no permite que los menores de
                            18 años usen el Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Su acceso y uso del Servicio también está condicionado a Su aceptación y
                            cumplimiento de la Política de Privacidad de la Compañía. Nuestra Política de
                            privacidad describe Nuestras políticas y procedimientos sobre la recopilación, el uso y
                            la divulgación de Su información personal cuando utiliza la Aplicación o el Sitio web y le
                            informa sobre Sus derechos de privacidad y cómo la ley lo protege. Lea atentamente
                            Nuestra Política de Privacidad antes de utilizar Nuestro Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >Enlaces a otros sitios web</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no
                            son propiedad ni están controlados por la Compañía.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            La Compañía no tiene control ni asume ninguna responsabilidad por el contenido, las
                            políticas de privacidad o las prácticas de los sitios web o servicios de terceros. Además,
                            reconoce y acepta que la Compañía no será responsable, directa o indirectamente, de
                            ningún daño o pérdida causados o presuntamente causados por o en relación con el
                            uso o la confianza en dicho contenido, bienes o servicios disponibles en o a través de
                            dichos sitios web o servicios.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Le recomendamos encarecidamente que lea los términos y condiciones y las políticas
                            de privacidad de cualquier sitio web o servicio de terceros que visite.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Terminación'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Podemos rescindir o suspender Su acceso de inmediato, sin previo aviso ni
                            responsabilidad, por cualquier motivo, incluido, entre otros, si incumple estos Términos
                            y condiciones.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Tras la rescisión, su derecho a utilizar el Servicio cesará inmediatamente.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >Limitación de responsabilidad</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            En la medida máxima permitida por la ley aplicable, en ningún caso la Compañía o sus
                            proveedores serán responsables de daños especiales, incidentales, indirectos o
                            consecuentes de ningún tipo (incluidos, entre otros, daños por lucro cesante, pérdida
                            de datos u otra información, por interrupción del negocio, por lesiones personales,
                            pérdida de privacidad que surja o esté relacionada de alguna manera con el uso o la
                            incapacidad de usar el Servicio, software de terceros y/o hardware de terceros utilizado
                            con el Servicio, o de lo contrario en relación con cualquier disposición de estos
                            Términos), incluso si la Compañía o cualquier proveedor ha sido advertido de la
                            posibilidad de tales daños e incluso si el remedio no cumple con su propósito esencial.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Algunos estados no permiten la exclusión de garantías implícitas o la limitación de
                            responsabilidad por daños incidentales o consecuentes, lo que significa que algunas de
                            las limitaciones anteriores pueden no aplicarse. En estos estados, la responsabilidad
                            de cada parte se limitará en la mayor medida permitida por la ley.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Descargo de responsabilidad "TAL CUAL" y "SEGÚN DISPONIBILIDAD"'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`El Servicio se le proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD" y con todas las
                            fallas y defectos sin garantía de ningún tipo. En la medida máxima permitida por la ley
                            aplicable, la Compañía, en su propio nombre y en nombre de sus Afiliados y sus
                            respectivos otorgantes de licencias y proveedores de servicios, renuncia expresamente
                            a todas las garantías, ya sean expresas, implícitas, estatutarias o de otro tipo, con
                            respecto a la Servicio, incluidas todas las garantías implícitas de comerciabilidad,
                            idoneidad para un propósito particular, título y no infracción, y garantías que puedan
                            surgir del curso de la negociación, el curso del desempeño, el uso o la práctica
                            comercial. Sin limitación a lo anterior, la Compañía no ofrece ninguna garantía o
                            compromiso, y no hace ninguna representación de ningún tipo de que el Servicio
                            cumplirá con Sus requisitos, logrará los resultados previstos,`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Sin limitar lo anterior, ni la Compañía ni ninguno de los proveedores de la compañía
                            hace ninguna representación o garantía de ningún tipo, expresa o implícita: (i) en
                            cuanto a la operación o disponibilidad del Servicio, o la información, contenido y
                            materiales o productos incluido en el mismo; (ii) que el Servicio será ininterrumpido o
                            libre de errores; (iii) en cuanto a la precisión, confiabilidad o actualidad de cualquier
                            información o contenido proporcionado a través del Servicio; o (iv) que el Servicio, sus
                            servidores, el contenido o los correos electrónicos enviados desde o en nombre de la
                            Compañía están libres de virus, secuencias de comandos, troyanos, gusanos, malware,
                            bombas de tiempo u otros componentes dañinos.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Algunas jurisdicciones no permiten la exclusión de ciertos tipos de garantías o
                            limitaciones de los derechos legales aplicables de un consumidor, por lo que es posible
                            que algunas o todas las exclusiones y limitaciones anteriores no se apliquen a
                            usted. Pero en tal caso, las exclusiones y limitaciones establecidas en esta sección se
                            aplicarán en la mayor medida exigible según la ley aplicable.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >Ley que rige</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Las leyes del País, excluyendo sus conflictos de leyes, regirán estos Términos y Su uso
                            del Servicio. Su uso de la Aplicación también puede estar sujeto a otras leyes locales,
                            estatales, nacionales o internacionales.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Resolución de disputas'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Si tiene alguna inquietud o disputa sobre el Servicio, acepta intentar primero resolver la
                            disputa de manera informal comunicándose con la Compañía.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >Divisibilidad y renuncia</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1' color='#000000'>Divisibilidad</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha
                            disposición se cambiará e interpretará para lograr los objetivos de dicha disposición en
                            la mayor medida posible según la ley aplicable y las disposiciones restantes
                            continuarán en pleno vigor y efecto.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1' color='#000000'>Exención</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Salvo lo dispuesto en el presente, la falta de ejercicio de un derecho o de exigir el
                            cumplimiento de una obligación en virtud de estos Términos no afectará la capacidad
                            de una parte para ejercer dicho derecho o exigir dicho cumplimiento en cualquier
                            momento posterior ni la renuncia a un incumplimiento constituirá una renuncia a
                            cualquier incumplimiento posterior.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Cambios a estos Términos y Condiciones'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Nos reservamos el derecho, a Nuestro exclusivo criterio, de modificar o reemplazar
                            estos Términos en cualquier momento. Si una revisión es importante, haremos todos
                            los esfuerzos razonables para proporcionar un aviso de al menos 30 días antes de que
                            entren en vigencia los nuevos términos. Lo que constituye un cambio material se
                            determinará a Nuestro exclusivo criterio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Al continuar accediendo o utilizando Nuestro Servicio después de que esas revisiones
                            entren en vigencia, Usted acepta estar sujeto a los términos revisados. Si no está de
                            acuerdo con los nuevos términos, en su totalidad o en parte, deje de usar el sitio web y
                            el Servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={600} color='#666666' >{'Contáctenos'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • Por correo electrónico: gps@segycom.com.mx
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            • Por número de teléfono: (614) 169 0211
                        </Typography>
                    </Grid>

                </Grid>

                


            </Grid>



        </Box>

    </Container>
       
    </MainLayout>
  )
}

export default Terminos