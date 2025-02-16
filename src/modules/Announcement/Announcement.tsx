import { Button, HintText, Input, PhotoUploader, Radio, Select, Textarea } from "../../components"
import "./style.css"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"

export const Announcement = () => {
  const fileScheme = z.instanceof(File).nullable();
  const formSchema = z.object({
    name: z.string()
    .min(1, { message: "Поле обязательно для заполнения" })
    .refine((value) => {
        return !/\b\w*\d+\w*\b/.test(value);
      },
      {message: 'Значение не должно содержать цифр'}
    ),
    kind: z.string().min(1, { message: "Поле обязательно для заполнения" }),
    description: z.string().min(1, { message: "Поле обязательно для заполнения" }),
    cost: z.string()
    .min(1, { message: "Поле обязательно для заполнения" })
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: 'Поле должно содержать только цифры',
      }
    ),
    images: z.array(z.object({file: fileScheme})),
    video: z.string()
    .refine(
      (value) => {
        return /^http.*\/.*\..*$/.test(value);
      },
      {
        message:
          'Введеное значение не является ссылкой',
      }
    ),
    city: z.string(),
    phone: z.string()
    .min(1, { message: "Поле обязательно для заполнения" })
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: 'Поле должно содержать только цифры',
      }
    )
  })

  const methods  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      kind: 'self',
      description: '',
      cost: '',
      images: [],
      video: '',
      city: '',
      phone: ''
    },
  })

  const { getValues } = methods

  const kindOptions = [{value: "self", label: "Покупал для себя"}, {value: "bu", label: "Покупал для перепродажи"}]
  const cityOptions = [
    {value: "msc", label: "Москва"}, 
    {value: "spb", label: "Санкт-Петербург"},
    {value: "ekb", label: "Екатеринбург"}, 
    {value: "kz", label: "Казань"},
    {value: "krd", label: "Краснодар"},
  ]

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
    alert("Объявление успешно создано и отправлено на модерацию");
  }

  return (
    <div className="root">
      <h1 className="title">Добавить обьявление</h1>
      <div className="announcement-form">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="block">
              <div className="block-name">Параметры</div>
              <div className="fields">
                <div className="field">
                  <div className="field-name">Название объявления</div>
                  <div>
                    <Input 
                      name="name"
                      className="text-input"
                      placeholder="Название"
                      isRequired
                    />
                    <HintText>Например, «iPhone 6S Plus серый космос 32 гб» или «Фотоаппарат Canon 700D Kit 18-55»</HintText>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Вид объявления</div>
                  <Radio
                    name="kind"
                    options={kindOptions}
                    defaultValue={getValues('kind') || ''}
                  />
                </div>
              </div>
            </div>

            <div className="block">
              <div className="block-name">Подробности</div>
              <div className="fields">
                <div className="field">
                  <div className="field-name">Описание объявления</div>
                  <div>
                    <Textarea 
                      name="description"
                      className="textarea-desc"
                      placeholder="Описание"
                      isRequired
                    />
                    <HintText>Не указывайте в описании телефон и e-mail — для этого есть отдельные поля</HintText>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Цена</div>
                  <Input 
                    name="cost"
                    type='number'
                    className="text-input"
                    placeholder="₽"
                    isRequired
                  />
                </div>
                <div className="field">
                  <div className="field-name">Фотографии</div>
                  <PhotoUploader
                    name="images"
                    limit={2}
                  />
                </div>
                <div className="field">
                  <div className="field-name">Видео</div>
                  <Input 
                    name="video"
                    className="text-input"
                    placeholder="Ссылка на видео"
                  />
                </div>
              </div>
            </div>

            <div className="block">
              <div className="block-name">Место сделки</div>
              <div className="fields">
                <div className="field">
                  <div className="field-name">Город</div>
                  <Select 
                    name="city"
                    options={cityOptions}
                    label="Выберите город"
                    className="city-select"
                  />
                </div>
              </div>
            </div>

            <div className="block">
              <div className="block-name">Контакты</div>
              <div className="fields">
                <div className="field">
                  <div className="field-name">Телефон</div>
                  <div>
                    <Input 
                      name="phone"
                      className="text-input"
                      placeholder="8 ___ ___ - __ - __"
                      isRequired
                      maxLength={11}
                    />
                    <HintText className="phone-hint-text">Чтобы ваши номера не попали в базы мошенников, мы показываем вместо них подменные, а звонки переводим вам. Эту защиту нельзя отключить.</HintText>
                    <HintText className="more-info-link"><a href="#">Подробнее</a></HintText>
                  </div>
                </div>
              </div>
            </div>

            <div className="actions">
              <Button 
                variant="contained" 
                color="#74B200"
                className="submit-btn"
              >
                Разместить
              </Button>
              <Button 
                variant="outlined" 
                type='button'
                className="save-btn"
              >
                Сохранить и выйти
              </Button>
            </div>

            <div className="agreements">
              Вы публикуете объявление и данные в нём, чтобы их мог посмотреть кто угодно в интернете. Вы также соглашаетесь с <a href="#">правилами</a>.
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}